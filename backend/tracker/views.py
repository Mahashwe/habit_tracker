from django.conf import settings
from django.utils import timezone
from rest_framework.viewsets import ModelViewSet
from rest_framework.response import Response
from rest_framework import status

from .models import Habit
from .serializers import HabitSerializer
import os
from dotenv import load_dotenv
import google.generativeai as genai

from rest_framework.viewsets import ViewSet
from rest_framework.response import Response

load_dotenv()
genai.configure(api_key=os.getenv("GEMINI_API_KEY"))
model = genai.GenerativeModel("gemini-2.5-flash")

class HabitViewSet(ModelViewSet):
    queryset = Habit.objects.all()
    serializer_class = HabitSerializer

    def create(self, request, *args, **kwargs):
        habitName = request.data.get("habitName")
        habitDescription = request.data.get("habitDescription")
        frequency = request.data.get("frequency")
        done = request.data.get("done", False)  

        habit = Habit.objects.create(
            habitName=habitName,
            habitDescription=habitDescription,
            frequency=frequency,
            done=done,
        )
        serializer = self.get_serializer(habit)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    def update(self, request, *args, **kwargs):
        habit = self.get_object()
        habitName = request.data.get("habitName")
        habitDescription = request.data.get("habitDescription")
        frequency = request.data.get("frequency")
        done = request.data.get("done")

        habit.habitName = habitName
        habit.habitDescription = habitDescription
        habit.frequency = frequency
        habit.done = done
        habit.save()

        serializer = self.get_serializer(habit)
        return Response(serializer.data)

    def destroy(self, request, *args, **kwargs):
        habit = self.get_object()
        habit.delete()
        return Response(
            {"message": "Habit deleted successfully"},
            status=status.HTTP_200_OK,
        )


class TrackerViewSet(ModelViewSet):
    queryset = Habit.objects.all()
    serializer_class = HabitSerializer

    def partial_update(self, request, *args, **kwargs):
        habit = self.get_object()
        today = timezone.now().date()

        serializer = self.get_serializer(habit, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        progress = serializer.validated_data.get("done", habit.done)


        if progress and habit.frequency > 0:
            if not habit.done or habit.last_updated != today:
                habit.frequency -= 1
                habit.last_updated = today

        serializer.save(frequency=habit.frequency, last_updated=habit.last_updated)
        return Response(serializer.data)

class GeminiViewSet(ViewSet):

     def create(self, request):
        system_prompt = "You are a helpful AI habit assistant.\nAlways answer within the context of habits.\nBe clear and concise.\nLimit your response to 3-5 short sentences.\nIf you don't know the answer, say you don't know."
        user_prompt = request.data.get("prompt")

        if not user_prompt:
            return Response({"error": "Prompt required"}, status=400)

        try:
            response = model.generate_content(
                contents=[
                    {"role": "user", "parts": [{"text": system_prompt}]},
                    {"role": "user", "parts": [{"text": user_prompt}]},
                ]
            )

            return Response({"answer": response.text})

        except Exception as e:
            return Response({"error": str(e)}, status=500)