from rest_framework.viewsets import ModelViewSet
from .models import Habit
from .serializers import HabitSerializer
from rest_framework.response import Response
from rest_framework import status

class HabitViewSet(ModelViewSet):
    queryset = Habit.objects.all()
    serializer_class = HabitSerializer

    def create(self, request):
        habitName = request.data.get('habitName')
        habitDescription = request.data.get('habitDescription')
        frequency = request.data.get('frequency')
        done = request.data.get('done')

        habit = Habit.objects.create(
            habitName=habitName,
            habitDescription=habitDescription,
            frequency=frequency,
            done=done
        )
        serializer = self.get_serializer(habit)
        return Response(serializer.data)
    
    def update(self, request, *args, **kwargs):
        habit = self.get_object()
        habitName = request.data.get('habitName')
        habitDescription = request.data.get('habitDescription')
        frequency = request.data.get('frequency')
        done = request.data.get('done')

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
        return Response(status=status.HTTP_200_OK)
    
