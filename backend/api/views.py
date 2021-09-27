from django.shortcuts import render
from django.http import (
    HttpRequest,
    HttpResponse,
    JsonResponse,
    HttpResponseForbidden,
    HttpResponseServerError,
)

from django.views.decorators.csrf import csrf_exempt

import json

# Create your views here.
def index(request):
    return HttpResponse("api works")


@csrf_exempt
def render_json(request: HttpRequest):
    if request.method == "POST":
        data = json.loads(request.body)

        try:
            response = {
                "document": data["text"],
                "annotation": list(
                    map(
                        lambda x: {
                            "start": x["startIndex"],
                            "end": x["endIndex"],
                            "label": x["label"],
                            "text": x["text"],
                        },
                        data["annotations"],
                    )
                ),
            }
            print(response)
            return JsonResponse(response)

        except:
            return HttpResponseServerError()

    else:
        return HttpResponseForbidden()
