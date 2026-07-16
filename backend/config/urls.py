import re

from django.conf import settings
from django.contrib import admin
from django.urls import include, path, re_path
from django.views.generic import RedirectView
from django.views.static import serve


urlpatterns = [
    path("", RedirectView.as_view(url="/admin/", permanent=False), name="root"),
    path("admin/", admin.site.urls),
    path("api/", include("portfolio.urls")),
]

# Serve local media in Docker even when DEBUG is off. The django.conf.urls.static.static()
# helper returns nothing when DEBUG=False, so we register the serve view explicitly.
# Replace with a CDN/object storage (e.g. Cloudinary) in production.
media_prefix = settings.MEDIA_URL.lstrip("/")
urlpatterns += [
    re_path(
        r"^%s(?P<path>.*)$" % re.escape(media_prefix),
        serve,
        {"document_root": settings.MEDIA_ROOT},
    ),
]
