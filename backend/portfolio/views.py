from rest_framework import mixins, status, viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.throttling import AnonRateThrottle
from rest_framework.views import APIView

from .models import Certificate, Education, Experience, Interest, Profile, Project, Skill
from .serializers import (
    CertificateSerializer,
    ContactMessageSerializer,
    EducationSerializer,
    ExperienceSerializer,
    InterestSerializer,
    ProfileSerializer,
    ProjectSerializer,
    SkillSerializer,
)


class ContactRateThrottle(AnonRateThrottle):
    scope = "contact"


class ProfileView(APIView):
    def get(self, request):
        profile = Profile.objects.first()
        if not profile:
            return Response({}, status=status.HTTP_200_OK)
        serializer = ProfileSerializer(profile, context={"request": request})
        return Response(serializer.data)


class SkillViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Skill.objects.all()
    serializer_class = SkillSerializer

    @action(detail=False, methods=["get"])
    def grouped(self, request):
        grouped = {}
        for skill in self.get_queryset():
            key = skill.get_category_display()
            grouped.setdefault(key, []).append(SkillSerializer(skill).data)
        return Response(grouped)


class InterestViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Interest.objects.all()
    serializer_class = InterestSerializer


class ProjectViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Project.objects.prefetch_related("gallery")
    serializer_class = ProjectSerializer
    lookup_field = "slug"

    def get_queryset(self):
        queryset = super().get_queryset()
        featured = self.request.query_params.get("featured")
        if featured is not None:
            queryset = queryset.filter(featured=featured.lower() in {"1", "true", "yes"})
        return queryset


class ExperienceViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Experience.objects.all()
    serializer_class = ExperienceSerializer


class EducationViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Education.objects.all()
    serializer_class = EducationSerializer


class CertificateViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Certificate.objects.all()
    serializer_class = CertificateSerializer


class ContactMessageView(mixins.CreateModelMixin, viewsets.GenericViewSet):
    serializer_class = ContactMessageSerializer
    throttle_classes = [ContactRateThrottle]

    def create(self, request, *args, **kwargs):
        if request.data.get("website"):
            return Response({"detail": "Message received."}, status=status.HTTP_202_ACCEPTED)
        return super().create(request, *args, **kwargs)
