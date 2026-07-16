from django.urls import include, path
from rest_framework.routers import DefaultRouter

from .views import (
    CertificateViewSet,
    ContactMessageView,
    EducationViewSet,
    ExperienceViewSet,
    InterestViewSet,
    ProfileView,
    ProjectViewSet,
    SkillViewSet,
)


router = DefaultRouter()
router.register("skills", SkillViewSet, basename="skill")
router.register("interests", InterestViewSet, basename="interest")
router.register("projects", ProjectViewSet, basename="project")
router.register("experience", ExperienceViewSet, basename="experience")
router.register("education", EducationViewSet, basename="education")
router.register("certificates", CertificateViewSet, basename="certificate")
router.register("contact", ContactMessageView, basename="contact")

urlpatterns = [
    path("profile/", ProfileView.as_view(), name="profile"),
    path("", include(router.urls)),
]
