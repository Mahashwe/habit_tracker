from django.shortcuts import render
from django.http import HttpResponse
from .models import Habit
from django.views.decorators.csrf import csrf_exempt

class HabitViewSet:
    def create(self, request):
        name = request.POST.get("name")
        description = request.POST.get("description", "")
        remaining = int(request.POST.get("remaining", 0))
        habit = Habit.objects.create(name=name, description=description, remaining=remaining)
        return HttpResponse({"id": habit.id, "name": habit.name, "description": habit.description, "remaining": habit.remaining, "done": habit.done})
    
    def delete(self, request, habit_id):
        try:
            habit = Habit.objects.get(id=habit_id)
            habit.delete()
            return HttpResponse(status=204)
        except Habit.DoesNotExist:
            return HttpResponse(status=404)
        
    def update(self, request, habit_id):
        try:
            habit = Habit.objects.get(id=habit_id)
            habit.name = request.POST.get("name", habit.name)
            habit.description = request.POST.get("description", habit.description)
            habit.remaining = int(request.POST.get("remaining", habit.remaining))
            habit.done = request.POST.get("done", str(habit.done)).lower() == "true"
            habit.save()
            return HttpResponse({"id": habit.id, "name": habit.name, "description": habit.description, "remaining": habit.remaining, "done": habit.done})
        except Habit.DoesNotExist:
            return HttpResponse(status=404)
        