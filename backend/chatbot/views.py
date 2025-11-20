from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, parsers
from django.http import JsonResponse
from django.conf import settings
import os

from .utils import (
    load_excel_from_path, load_excel_from_file,
    filter_by_area, get_chart_data, make_summary_text
)

PRELOADED_PATH = os.path.join(settings.BASE_DIR, "sample_data", "realestate_sample.xlsx")
_cached_df = None

def get_df():
    global _cached_df
    if _cached_df is None:
        _cached_df = load_excel_from_path(PRELOADED_PATH)
    return _cached_df

def health(request):
    return JsonResponse({"status": "ok"})

class UploadExcelView(APIView):
    parser_classes = [parsers.MultiPartParser]

    def post(self, request):
        file_obj = request.FILES.get("file")
        if not file_obj:
            return Response({"error": "No file provided"}, status=400)

        global _cached_df
        _cached_df = load_excel_from_file(file_obj)

        return Response({"message": "File uploaded successfully"})

class QueryView(APIView):
    def post(self, request):
        query = request.data.get("query", "")
        metric = request.data.get("metric", "price")

        areas = query.lower().split()
        df = get_df()

        filtered = filter_by_area(df, areas)
        summary = make_summary_text(filtered, areas)
        chart = get_chart_data(filtered, metric)
        table = filtered.head(200).to_dict(orient="records")

        return Response({
            "summary": summary,
            "chart": chart,
            "table": table
        })
