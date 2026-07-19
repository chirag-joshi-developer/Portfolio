from datetime import date
from io import BytesIO

from django.core.files.base import ContentFile
from django.core.management.base import BaseCommand
from django.utils.text import slugify
from PIL import Image, ImageDraw, ImageFont

from portfolio.models import Certificate, Education, Experience, Interest, Profile, Project, ProjectImage, Skill


def image_file(label, size=(1200, 800), accent=(255, 214, 10)):
    image = Image.new("RGB", size, (10, 10, 10))
    draw = ImageDraw.Draw(image)
    draw.rectangle((32, 32, size[0] - 32, size[1] - 32), outline=accent, width=8)
    draw.ellipse((size[0] - 280, 80, size[0] - 80, 280), fill=(23, 23, 23), outline=accent, width=6)
    font = ImageFont.load_default()
    draw.text((72, size[1] // 2 - 20), label, fill=(255, 255, 255), font=font)
    draw.text((72, size[1] // 2 + 18), "Replace from Django Admin", fill=(163, 163, 163), font=font)
    buffer = BytesIO()
    image.save(buffer, format="PNG")
    return ContentFile(buffer.getvalue(), name=f"{safe_name(label)}.png")


def safe_name(label):
    return slugify(label) or "placeholder"


def pdf_file():
    content = b"%PDF-1.4\n1 0 obj<</Type/Catalog/Pages 2 0 R>>endobj\n2 0 obj<</Type/Pages/Count 0>>endobj\ntrailer<</Root 1 0 R>>\n%%EOF\n"
    return ContentFile(content, name="chirag-resume-placeholder.pdf")


class Command(BaseCommand):
    help = "Seed the portfolio with demo content and placeholder media."

    def handle(self, *args, **options):
        profile, _ = Profile.objects.update_or_create(
            id=1,
            defaults={
                "full_name": "Chirag",
                "tagline": "Software Engineer focused on full-stack products and AI workflows.",
                "roles": "Software Engineer,AI/ML Enthusiast,Full-Stack Developer",
                "intro": "I build polished, practical software that turns ideas into usable products.",
                "bio": (
                    "I am a developer who enjoys building complete products across the stack. "
                    "My work blends clean interfaces, reliable APIs, and an interest in AI-assisted systems."
                ),
                "email": "chirag@example.com",
                "location": "India",
                "status": "Open to opportunities",
                "years_experience": "Early career",
                "linkedin_url": "https://www.linkedin.com/",
                "github_url": "https://github.com/",
                "mobile_number": "",
            },
        )
        if not profile.profile_photo:
            profile.profile_photo.save("profile-placeholder.png", image_file("Chirag", (800, 800)), save=True)
        if not profile.resume_pdf:
            profile.resume_pdf.save("chirag-resume-placeholder.pdf", pdf_file(), save=True)

        skills = {
            Skill.Category.LANGUAGE: ["Python", "JavaScript", "SQL", "C++"],
            Skill.Category.FRAMEWORK: ["Django", "React", "Django REST Framework", "Tailwind CSS"],
            Skill.Category.TOOL: ["Docker", "Git", "MySQL", "Linux"],
            Skill.Category.AI_ML: ["Machine Learning", "Pandas", "NumPy", "Prompt Engineering"],
        }
        for category, names in skills.items():
            for order, name in enumerate(names):
                Skill.objects.update_or_create(
                    name=name,
                    category=category,
                    defaults={"order": order, "icon": ""},
                )

        interests = [
            ("Reading", "Books and technical essays"),
            ("Gaming", "Strategy games and interactive systems"),
            ("Open Source", "Learning from public codebases"),
            ("Photography", "Composition, light, and everyday scenes"),
            ("Fitness", "Consistency and better energy"),
            ("AI Experiments", "Trying new tools and workflows"),
        ]
        for order, (name, note) in enumerate(interests):
            Interest.objects.update_or_create(name=name, defaults={"note": note, "order": order, "icon": ""})

        project_data = [
            {
                "title": "AI Resume Analyzer",
                "slug": "ai-resume-analyzer",
                "short_description": "A dashboard that scores resumes against job descriptions and highlights gaps.",
                "description": (
                    "## Overview\n\n"
                    "A full-stack project that parses resumes, compares them with job descriptions, "
                    "and gives actionable improvement suggestions.\n\n"
                    "## Highlights\n\n"
                    "- Django REST API for analysis requests\n"
                    "- React dashboard for recruiter-style scoring\n"
                    "- AI-assisted keyword and skill-gap extraction"
                ),
                "tech_stack": "Python,Django,React,AI/ML",
                "category": "AI Tool",
                "featured": True,
                "order": 0,
            },
            {
                "title": "Portfolio CMS",
                "slug": "portfolio-cms",
                "short_description": "Admin-managed portfolio content with a responsive public website.",
                "description": (
                    "## Overview\n\n"
                    "A content-managed portfolio architecture with Django Admin powering all public sections.\n\n"
                    "## Highlights\n\n"
                    "- Admin CRUD for projects, skills, experience, education, and certificates\n"
                    "- REST API consumed by a modern React frontend\n"
                    "- Docker Compose setup for local and portable deployment"
                ),
                "tech_stack": "Django,DRF,React,Docker,MySQL",
                "category": "Full Stack",
                "featured": True,
                "order": 1,
            },
            {
                "title": "Learning Tracker",
                "slug": "learning-tracker",
                "short_description": "A productivity app for tracking skills, goals, and weekly learning streaks.",
                "description": (
                    "## Overview\n\n"
                    "A compact app designed to track courses, practice sessions, and project milestones.\n\n"
                    "## Highlights\n\n"
                    "- Goal and streak tracking\n"
                    "- Skill progress summaries\n"
                    "- Clean mobile-first interface"
                ),
                "tech_stack": "React,Tailwind CSS,JavaScript",
                "category": "Productivity",
                "featured": False,
                "order": 2,
            },
        ]
        for item in project_data:
            project, _ = Project.objects.update_or_create(slug=item["slug"], defaults=item)
            if not project.cover_image:
                project.cover_image.save(f"{project.slug}-cover.png", image_file(project.title), save=True)
            if project.gallery.count() == 0:
                for index in range(1, 4):
                    gallery = ProjectImage.objects.create(project=project, caption=f"{project.title} screen {index}", order=index)
                    gallery.image.save(f"{project.slug}-screen-{index}.png", image_file(f"{project.title} {index}"), save=True)

        experiences = [
            {
                "company_name": "Freelance / Personal Projects",
                "role": "Full-Stack Developer",
                "start_date": date(2025, 1, 1),
                "end_date": None,
                "location": "Remote",
                "description": "Built portfolio-ready web applications.\nDesigned REST APIs and responsive React interfaces.\nPackaged projects with Docker for repeatable setup.",
                "order": 0,
            },
            {
                "company_name": "Academic Projects",
                "role": "Software Developer",
                "start_date": date(2024, 1, 1),
                "end_date": date(2024, 12, 31),
                "location": "India",
                "description": "Collaborated on coursework and prototype applications.\nPracticed data modeling, UI implementation, and deployment basics.",
                "order": 1,
            },
        ]
        for item in experiences:
            experience, _ = Experience.objects.update_or_create(
                company_name=item["company_name"],
                role=item["role"],
                defaults=item,
            )
            if not experience.company_logo:
                experience.company_logo.save(f"{safe_name(experience.company_name)}.png", image_file(experience.company_name, (600, 600)), save=True)

        educations = [
            {
                "institution": "Your University",
                "degree": "Bachelor of Technology",
                "field_of_study": "Computer Science",
                "start_date": date(2022, 7, 1),
                "end_date": date(2026, 6, 30),
                "grade": "Add grade",
                "description": "Relevant coursework: data structures, databases, machine learning, and web development.",
                "order": 0,
            },
            {
                "institution": "Online Learning",
                "degree": "Professional Development",
                "field_of_study": "Full-Stack and AI",
                "start_date": date(2024, 1, 1),
                "end_date": None,
                "grade": "",
                "description": "Hands-on learning through projects, documentation, and applied experiments.",
                "order": 1,
            },
        ]
        for item in educations:
            Education.objects.update_or_create(
                institution=item["institution"],
                degree=item["degree"],
                defaults=item,
            )

        certificates = [
            ("Django for Web Development", "Demo Academy", date(2025, 3, 1)),
            ("React Frontend Engineering", "Demo Academy", date(2025, 5, 1)),
            ("Machine Learning Foundations", "Demo Academy", date(2025, 7, 1)),
        ]
        for order, (title, org, issued) in enumerate(certificates):
            certificate, _ = Certificate.objects.update_or_create(
                title=title,
                defaults={
                    "issuing_organization": org,
                    "issue_date": issued,
                    "credential_url": "https://example.com",
                    "order": order,
                },
            )
            if not certificate.certificate_image:
                certificate.certificate_image.save(f"{safe_name(title)}.png", image_file(title), save=True)

        self.stdout.write(self.style.SUCCESS("Seeded demo portfolio content."))
