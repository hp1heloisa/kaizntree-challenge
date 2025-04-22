from django.urls import path
from .views import SignUpView, SignInView, CategoryView, ItemView, TagView

urlpatterns = [
    path('signup', SignUpView.as_view(), name='signup'),
    path('signin', SignInView.as_view(), name='signin'),
    path('categories', CategoryView.as_view(), name='categories'),
    path('items', ItemView.as_view(), name='items'),
    path('tags', TagView.as_view(), name='tags'),
]