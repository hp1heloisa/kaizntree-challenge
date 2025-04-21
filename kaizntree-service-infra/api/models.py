from django.db import models
import uuid


class User(models.Model):
    email = models.EmailField(unique=True, blank=False, null=False)
    password = models.TextField(blank=False, null=False)

    def __str__(self):
        return self.email
    
    @property
    def is_authenticated(self):
        return True


class Token(models.Model):
    token = models.UUIDField(default=uuid.uuid4, unique=True, editable=False)
    user = models.ForeignKey(User, on_delete=models.CASCADE)


class Category(models.Model):
    name = models.TextField(blank=False, null=False)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
   
    class Meta:
        unique_together = ('user', 'name')

    def __str__(self):
        return f"{self.name} ({self.user.email})"


class Item(models.Model):
    sku = models.TextField()
    name = models.TextField(blank=False, null=False)
    available_stock = models.IntegerField(blank=False, null=False)
    cost = models.FloatField(blank=False, null=False)
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    
    class Meta:
        unique_together = ('name', 'category', 'user') 

    def __str__(self):
        return f"{self.name} - {self.available_stock} - {self.cost} ({self.category.name})"