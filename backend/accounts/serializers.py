from rest_framework import serializers
from django.contrib.auth import get_user_model
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from djoser.serializers import UserSerializer as DjoserUserSerializer


User = get_user_model()


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "username", "email", "first_name", "last_name"]
        read_only_fields = ["id", "email"]


class UserCreateSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    password_confirm = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ["email", "first_name", "last_name", "password", "password_confirm"]

    def validate(self, data):
        # Ensure that password and password_confirm match
        if data["password"] != data["password_confirm"]:
            raise serializers.ValidationError("Passwords do not match.")
        return data

    def create(self, validated_data):
        # Remove password_confirm from validated_data since it's not needed for saving the user
        validated_data.pop("password_confirm")
        # Create user with the provided email, first name, last name, and password
        user = User.objects.create_user(
            email=validated_data["email"],
            first_name=validated_data["first_name"],
            last_name=validated_data["last_name"],
            password=validated_data["password"],
        )
        return user


class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):

    @classmethod
    def get_token(cls, user):
        # Get the default token from the base implementation
        token = super().get_token(user)

        # Add custom fields to the token
        token["first_name"] = user.first_name
        token["last_name"] = user.last_name
        token["email"] = user.email

        return token


class CustomUserSerializer(DjoserUserSerializer):
    class Meta(DjoserUserSerializer.Meta):
        fields = ["id", "username", "email", "first_name", "last_name"]

    # def update(self, instance, validated_data):
    #     # If email is in the validated_data, update it
    #     email = validated_data.get("email", None)

    #     print(email)

    #     if email and email != instance.email:
    #         instance.email = email
    #         instance.save()  # Save the updated instance

    #     return instance
