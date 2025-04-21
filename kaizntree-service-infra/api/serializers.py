# serializers.py
from rest_framework import serializers
from django.contrib.auth.hashers import make_password
from .models import User, Item, Category


class UserSerializer(serializers.ModelSerializer):
    confirm_password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ['id', 'email', 'password', 'confirm_password']
        extra_kwargs = {
            'password': {'write_only': True} 
        }

    def validate(self, data):
        if data['password'] != data['confirm_password']:
            raise serializers.ValidationError("The passwords are different.")
        return data

    def create(self, validated_data):
        validated_data.pop('confirm_password')
        validated_data['password'] = make_password(validated_data['password']) 
        return super().create(validated_data)
    

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'name']
    
    def validate_name(self, value):
        user = self.context['request'].user
        if Category.objects.filter(user=user, name=value).exists():
            raise serializers.ValidationError("This category already exists")
        return value


class ItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = Item
        fields = ['id', 'sku', 'name', 'available_stock', 'cost', 'category']
        extra_kwargs = {
            'sku': {'required': False, 'allow_null': True, 'allow_blank': True},
        }

    def validate_name(self, value):
        user = self.context['request'].user
        if Item.objects.filter(user=user, name=value).exists():
            raise serializers.ValidationError("This item already exists")
        return value
