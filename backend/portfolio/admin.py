from django.contrib import admin
from django.utils.html import format_html

from .models import (
    Certificate,
    ContactMessage,
    Education,
    Experience,
    Interest,
    Profile,
    Project,
    ProjectImage,
    Resume,
    Skill,
)


admin.site.site_header = "Chirag - Portfolio Admin"
admin.site.site_title = "Chirag Portfolio"
admin.site.index_title = "Content dashboard"


def image_preview(obj, field_name):
    image = getattr(obj, field_name, None)
    if not image:
        return "-"
    return format_html(
        '<img src="{}" style="height: 48px; width: 48px; object-fit: cover; border-radius: 8px;" />',
        image.url,
    )


@admin.register(Profile)
class ProfileAdmin(admin.ModelAdmin):
    fieldsets = (
        ("Hero", {"fields": ("full_name", "tagline", "roles", "intro")}),
        ("About", {"fields": ("bio", "profile_photo", "resume_pdf")}),
        ("Quick facts", {"fields": ("email", "location", "status", "years_experience")}),
        ("Social links", {"fields": ("linkedin_url", "github_url", "mobile_number")}),
    )
    list_display = ("full_name", "email", "location", "status")

    def has_add_permission(self, request):
        return not Profile.objects.exists()


@admin.register(Resume)
class ResumeAdmin(admin.ModelAdmin):
    list_display = ("label", "file", "order", "updated_at")
    list_editable = ("order",)
    search_fields = ("label",)

    def has_add_permission(self, request):
        return Resume.objects.count() < Resume.MAX_RESUMES


@admin.register(Skill)
class SkillAdmin(admin.ModelAdmin):
    list_display = ("name", "category", "icon", "order")
    list_editable = ("category", "order")
    list_filter = ("category",)
    search_fields = ("name",)


@admin.register(Interest)
class InterestAdmin(admin.ModelAdmin):
    list_display = ("name", "icon", "note", "order")
    list_editable = ("order",)
    search_fields = ("name", "note")


class ProjectImageInline(admin.TabularInline):
    model = ProjectImage
    extra = 1
    fields = ("image", "caption", "order")


@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    inlines = [ProjectImageInline]
    list_display = ("title", "category", "featured", "order", "cover_preview", "updated_at")
    list_editable = ("featured", "order")
    list_filter = ("featured", "category")
    prepopulated_fields = {"slug": ("title",)}
    search_fields = ("title", "short_description", "description", "tech_stack")
    fieldsets = (
        (None, {"fields": ("title", "slug", "short_description", "description")}),
        ("Media", {"fields": ("cover_image",)}),
        ("Classification", {"fields": ("tech_stack", "category", "featured", "order")}),
        ("Links", {"fields": ("live_url", "github_url")}),
    )

    @admin.display(description="Cover")
    def cover_preview(self, obj):
        return image_preview(obj, "cover_image")


@admin.register(Experience)
class ExperienceAdmin(admin.ModelAdmin):
    list_display = ("role", "company_name", "start_date", "end_date", "location", "order", "logo_preview")
    list_editable = ("order",)
    search_fields = ("company_name", "role", "location", "description")

    @admin.display(description="Logo")
    def logo_preview(self, obj):
        return image_preview(obj, "company_logo")


@admin.register(Education)
class EducationAdmin(admin.ModelAdmin):
    list_display = ("degree", "institution", "field_of_study", "start_date", "end_date", "grade", "order")
    list_editable = ("order",)
    search_fields = ("institution", "degree", "field_of_study", "description")


@admin.register(Certificate)
class CertificateAdmin(admin.ModelAdmin):
    list_display = ("title", "issuing_organization", "issue_date", "order", "certificate_preview")
    list_editable = ("order",)
    search_fields = ("title", "issuing_organization")

    @admin.display(description="Certificate")
    def certificate_preview(self, obj):
        return image_preview(obj, "certificate_image")


@admin.register(ContactMessage)
class ContactMessageAdmin(admin.ModelAdmin):
    list_display = ("subject", "name", "email", "submitted_at", "is_read")
    list_filter = ("is_read", "submitted_at")
    search_fields = ("name", "email", "subject", "message")
    readonly_fields = ("name", "email", "subject", "message", "submitted_at")
    actions = ("mark_as_read", "mark_as_unread")

    def has_add_permission(self, request):
        return False

    def get_readonly_fields(self, request, obj=None):
        return ("name", "email", "subject", "message", "submitted_at", "is_read")

    @admin.action(description="Mark selected messages as read")
    def mark_as_read(self, request, queryset):
        queryset.update(is_read=True)

    @admin.action(description="Mark selected messages as unread")
    def mark_as_unread(self, request, queryset):
        queryset.update(is_read=False)
