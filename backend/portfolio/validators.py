from django.core.exceptions import ValidationError
from django.utils.deconstruct import deconstructible


MAX_IMAGE_SIZE_MB = 5
MAX_DOCUMENT_SIZE_MB = 10

ALLOWED_IMAGE_EXTENSIONS = {"jpg", "jpeg", "png", "webp", "gif"}
ALLOWED_IMAGE_CONTENT_TYPES = {
    "image/jpeg",
    "image/png",
    "image/webp",
    "image/gif",
}
ALLOWED_DOCUMENT_EXTENSIONS = {"pdf"}
ALLOWED_DOCUMENT_CONTENT_TYPES = {"application/pdf"}


@deconstructible
class FileValidator:
    """Validate an uploaded file by extension, content type, and size."""

    def __init__(self, allowed_extensions, allowed_content_types, max_size_mb):
        self.allowed_extensions = {ext.lower() for ext in allowed_extensions}
        self.allowed_content_types = {ct.lower() for ct in allowed_content_types}
        self.max_size_mb = max_size_mb

    def __call__(self, value):
        name = getattr(value, "name", "") or ""
        extension = name.rsplit(".", 1)[-1].lower() if "." in name else ""
        if extension not in self.allowed_extensions:
            raise ValidationError(
                "Unsupported file type '.%(ext)s'. Allowed: %(allowed)s."
                % {
                    "ext": extension or "unknown",
                    "allowed": ", ".join(sorted(self.allowed_extensions)),
                }
            )

        content_type = getattr(value.file, "content_type", None) if hasattr(value, "file") else None
        if content_type and content_type.lower() not in self.allowed_content_types:
            raise ValidationError("Unsupported content type '%(ct)s'." % {"ct": content_type})

        size = getattr(value, "size", None)
        if size is not None and size > self.max_size_mb * 1024 * 1024:
            raise ValidationError(
                "File is too large. Maximum size is %(max)s MB." % {"max": self.max_size_mb}
            )

    def __eq__(self, other):
        return (
            isinstance(other, FileValidator)
            and self.allowed_extensions == other.allowed_extensions
            and self.allowed_content_types == other.allowed_content_types
            and self.max_size_mb == other.max_size_mb
        )


validate_image_file = FileValidator(
    ALLOWED_IMAGE_EXTENSIONS, ALLOWED_IMAGE_CONTENT_TYPES, MAX_IMAGE_SIZE_MB
)
validate_document_file = FileValidator(
    ALLOWED_DOCUMENT_EXTENSIONS, ALLOWED_DOCUMENT_CONTENT_TYPES, MAX_DOCUMENT_SIZE_MB
)
