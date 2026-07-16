from django.core.exceptions import ValidationError
from django.db import models
from django.template.defaultfilters import slugify

from .validators import validate_document_file, validate_image_file


class OrderedModel(models.Model):
    order = models.PositiveIntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True
        ordering = ["order", "-created_at"]


class Profile(models.Model):
    full_name = models.CharField(max_length=120)
    tagline = models.CharField(max_length=180)
    roles = models.CharField(
        max_length=255,
        default="Software Engineer,AI/ML Enthusiast,Full-Stack Developer",
        help_text="Comma-separated hero roles for the typewriter effect.",
    )
    intro = models.CharField(max_length=255, blank=True)
    bio = models.TextField()
    profile_photo = models.ImageField(
        upload_to="profile/", blank=True, validators=[validate_image_file]
    )
    resume_pdf = models.FileField(
        upload_to="resume/", blank=True, validators=[validate_document_file]
    )
    email = models.EmailField()
    location = models.CharField(max_length=120, blank=True)
    status = models.CharField(max_length=120, blank=True)
    years_experience = models.CharField(max_length=50, blank=True)
    linkedin_url = models.URLField(blank=True)
    github_url = models.URLField(blank=True)
    twitter_url = models.URLField(blank=True)

    class Meta:
        verbose_name = "Profile / About"
        verbose_name_plural = "Profile / About"

    def clean(self):
        if not self.pk and Profile.objects.exists():
            raise ValidationError("Only one profile can be created.")

    def save(self, *args, **kwargs):
        self.full_clean()
        return super().save(*args, **kwargs)

    def __str__(self):
        return self.full_name


class Resume(OrderedModel):
    MAX_RESUMES = 5

    label = models.CharField(
        max_length=120,
        help_text="Title shown in the download dropdown (e.g. 'Frontend Resume').",
    )
    file = models.FileField(upload_to="resume/", validators=[validate_document_file])

    def clean(self):
        if not self.pk and Resume.objects.count() >= self.MAX_RESUMES:
            raise ValidationError(
                f"You can upload at most {self.MAX_RESUMES} resumes."
            )

    def save(self, *args, **kwargs):
        self.full_clean()
        return super().save(*args, **kwargs)

    def __str__(self):
        return self.label


class Skill(OrderedModel):
    class Category(models.TextChoices):
        LANGUAGE = "language", "Languages"
        FRAMEWORK = "framework", "Frameworks / Libraries"
        TOOL = "tool", "Tools"
        AI_ML = "ai_ml", "AI / ML"

    name = models.CharField(max_length=80)
    category = models.CharField(max_length=20, choices=Category.choices)
    icon = models.CharField(max_length=80, blank=True, help_text="Optional icon name or emoji.")

    class Meta(OrderedModel.Meta):
        ordering = ["category", "order", "name"]

    def __str__(self):
        return self.name


class Interest(OrderedModel):
    name = models.CharField(max_length=80)
    icon = models.CharField(max_length=80, blank=True, help_text="Optional icon name or emoji.")
    note = models.CharField(max_length=180, blank=True)

    def __str__(self):
        return self.name


class Project(OrderedModel):
    title = models.CharField(max_length=160)
    slug = models.SlugField(max_length=180, unique=True, blank=True)
    short_description = models.CharField(max_length=255)
    description = models.TextField(help_text="Markdown is supported on the frontend.")
    cover_image = models.ImageField(
        upload_to="projects/covers/", blank=True, validators=[validate_image_file]
    )
    tech_stack = models.CharField(max_length=255, help_text="Comma-separated tech tags.")
    category = models.CharField(max_length=100, blank=True)
    live_url = models.URLField(blank=True)
    github_url = models.URLField(blank=True)
    featured = models.BooleanField(default=False)

    class Meta(OrderedModel.Meta):
        ordering = ["order", "-featured", "-created_at"]

    def save(self, *args, **kwargs):
        if not self.slug:
            base_slug = slugify(self.title)
            slug = base_slug
            counter = 2
            while Project.objects.exclude(pk=self.pk).filter(slug=slug).exists():
                slug = f"{base_slug}-{counter}"
                counter += 1
            self.slug = slug
        return super().save(*args, **kwargs)

    def __str__(self):
        return self.title


class ProjectImage(OrderedModel):
    project = models.ForeignKey(Project, related_name="gallery", on_delete=models.CASCADE)
    image = models.ImageField(
        upload_to="projects/gallery/", validators=[validate_image_file]
    )
    caption = models.CharField(max_length=160, blank=True)

    def __str__(self):
        return f"{self.project.title} image"


class Experience(OrderedModel):
    company_name = models.CharField(max_length=160)
    role = models.CharField(max_length=160)
    start_date = models.DateField()
    end_date = models.DateField(blank=True, null=True)
    location = models.CharField(max_length=120, blank=True)
    description = models.TextField(help_text="Use one bullet per line.")
    company_logo = models.ImageField(
        upload_to="experience/logos/", blank=True, validators=[validate_image_file]
    )

    def __str__(self):
        return f"{self.role} at {self.company_name}"


class Education(OrderedModel):
    institution = models.CharField(max_length=180)
    degree = models.CharField(max_length=160)
    field_of_study = models.CharField(max_length=160, blank=True)
    start_date = models.DateField(blank=True, null=True)
    end_date = models.DateField(blank=True, null=True)
    grade = models.CharField(max_length=80, blank=True)
    description = models.TextField(blank=True)

    def __str__(self):
        return f"{self.degree} - {self.institution}"


class Certificate(OrderedModel):
    title = models.CharField(max_length=180)
    issuing_organization = models.CharField(max_length=160)
    issue_date = models.DateField(blank=True, null=True)
    credential_url = models.URLField(blank=True)
    certificate_image = models.ImageField(
        upload_to="certificates/", blank=True, validators=[validate_image_file]
    )

    def __str__(self):
        return self.title


class ContactMessage(models.Model):
    name = models.CharField(max_length=120)
    email = models.EmailField()
    subject = models.CharField(max_length=180)
    message = models.TextField()
    submitted_at = models.DateTimeField(auto_now_add=True)
    is_read = models.BooleanField(default=False)

    class Meta:
        ordering = ["-submitted_at"]

    def __str__(self):
        return f"{self.subject} from {self.name}"
