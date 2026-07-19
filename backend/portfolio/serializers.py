from rest_framework import serializers

from .models import (
    Certificate,
    Education,
    Experience,
    Interest,
    Profile,
    Project,
    ProjectImage,
    Resume,
    Skill,
)


class AbsoluteMediaMixin:
    def get_media_url(self, obj, field_name):
        field = getattr(obj, field_name, None)
        if not field:
            return ""
        url = field.url
        # Prefer root-relative URLs so the frontend (Vite/nginx) can proxy /media.
        if url.startswith("http://") or url.startswith("https://"):
            return url
        if not url.startswith("/"):
            url = f"/{url}"
        return url


class ResumeSerializer(AbsoluteMediaMixin, serializers.ModelSerializer):
    file_url = serializers.SerializerMethodField()

    class Meta:
        model = Resume
        fields = ["id", "label", "file_url", "order"]

    def get_file_url(self, obj):
        return self.get_media_url(obj, "file")


class ProfileSerializer(AbsoluteMediaMixin, serializers.ModelSerializer):
    profile_photo_url = serializers.SerializerMethodField()
    resume_pdf_url = serializers.SerializerMethodField()
    resumes = serializers.SerializerMethodField()
    roles_list = serializers.SerializerMethodField()
    quick_facts = serializers.SerializerMethodField()

    class Meta:
        model = Profile
        fields = [
            "full_name",
            "tagline",
            "roles",
            "roles_list",
            "intro",
            "bio",
            "profile_photo_url",
            "resume_pdf_url",
            "resumes",
            "email",
            "location",
            "status",
            "years_experience",
            "quick_facts",
            "linkedin_url",
            "github_url",
            "mobile_number",
        ]

    def get_profile_photo_url(self, obj):
        return self.get_media_url(obj, "profile_photo")

    def get_resume_pdf_url(self, obj):
        return self.get_media_url(obj, "resume_pdf")

    def get_resumes(self, obj):
        resumes = Resume.objects.all()
        return ResumeSerializer(resumes, many=True, context=self.context).data

    def get_roles_list(self, obj):
        return [role.strip() for role in obj.roles.split(",") if role.strip()]

    def get_quick_facts(self, obj):
        facts = []
        if obj.location:
            facts.append({"label": "Location", "value": obj.location})
        if obj.status:
            facts.append({"label": "Status", "value": obj.status})
        if obj.years_experience:
            facts.append({"label": "Experience", "value": obj.years_experience})
        return facts


class SkillSerializer(serializers.ModelSerializer):
    category_label = serializers.CharField(source="get_category_display", read_only=True)

    class Meta:
        model = Skill
        fields = ["id", "name", "category", "category_label", "icon", "order"]


class InterestSerializer(serializers.ModelSerializer):
    class Meta:
        model = Interest
        fields = ["id", "name", "icon", "note", "order"]


class ProjectImageSerializer(AbsoluteMediaMixin, serializers.ModelSerializer):
    image_url = serializers.SerializerMethodField()

    class Meta:
        model = ProjectImage
        fields = ["id", "image_url", "caption", "order"]

    def get_image_url(self, obj):
        return self.get_media_url(obj, "image")


class ProjectSerializer(AbsoluteMediaMixin, serializers.ModelSerializer):
    cover_image_url = serializers.SerializerMethodField()
    tech_stack_list = serializers.SerializerMethodField()
    gallery = ProjectImageSerializer(many=True, read_only=True)

    class Meta:
        model = Project
        fields = [
            "id",
            "title",
            "slug",
            "short_description",
            "description",
            "cover_image_url",
            "tech_stack",
            "tech_stack_list",
            "category",
            "live_url",
            "github_url",
            "featured",
            "order",
            "gallery",
        ]

    def get_cover_image_url(self, obj):
        return self.get_media_url(obj, "cover_image")

    def get_tech_stack_list(self, obj):
        return [tech.strip() for tech in obj.tech_stack.split(",") if tech.strip()]


class ExperienceSerializer(AbsoluteMediaMixin, serializers.ModelSerializer):
    company_logo_url = serializers.SerializerMethodField()
    bullets = serializers.SerializerMethodField()

    class Meta:
        model = Experience
        fields = [
            "id",
            "company_name",
            "role",
            "start_date",
            "end_date",
            "location",
            "description",
            "bullets",
            "company_logo_url",
            "order",
        ]

    def get_company_logo_url(self, obj):
        return self.get_media_url(obj, "company_logo")

    def get_bullets(self, obj):
        return [line.strip("- ").strip() for line in obj.description.splitlines() if line.strip()]


class EducationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Education
        fields = [
            "id",
            "institution",
            "degree",
            "field_of_study",
            "start_date",
            "end_date",
            "grade",
            "description",
            "order",
        ]


class CertificateSerializer(AbsoluteMediaMixin, serializers.ModelSerializer):
    certificate_image_url = serializers.SerializerMethodField()

    class Meta:
        model = Certificate
        fields = [
            "id",
            "title",
            "issuing_organization",
            "issue_date",
            "credential_url",
            "certificate_image_url",
            "order",
        ]

    def get_certificate_image_url(self, obj):
        return self.get_media_url(obj, "certificate_image")


