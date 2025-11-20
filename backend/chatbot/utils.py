import pandas as pd
import re

def clean_df(df):
    df = df.copy()

    # Normalize column names
    df.columns = df.columns.str.lower().str.strip()

    # Your Excel stores area names in "final location"
    possible_area_cols = [
        "area",
        "locality",
        "location",
        "place",
        "region",
        "final location"   # <-- IMPORTANT FIX FOR YOUR FILE
    ]

    area_col = None
    for col in possible_area_cols:
        if col in df.columns:
            area_col = col
            break

    if area_col is None:
        raise ValueError(
            "Excel must contain a location field (e.g., area/locality/location/final location)"
        )

    # Create area_clean
    df["area_clean"] = df[area_col].astype(str).str.lower().str.strip()

    # Convert year if exists
    if "year" in df.columns:
        df["year"] = pd.to_numeric(df["year"], errors="coerce")

    # Try to detect price and demand columns
    # Your file uses: flat - weighted average rate
    if "flat - weighted average rate" in df.columns:
        df["price"] = pd.to_numeric(df["flat - weighted average rate"], errors="coerce")

    # demand is unknown, so we set dummy demand = total_sales / 1e7
    if "total_sales - igr" in df.columns:
        df["demand"] = df["total_sales - igr"] / 10000000

    return df


def load_excel_from_path(path):
    df = pd.read_excel(path)
    return clean_df(df)

def load_excel_from_file(file_obj):
    df = pd.read_excel(file_obj)
    return clean_df(df)

def filter_by_area(df, areas):
    masks = False
    for area in areas:
        a = area.lower()
        masks = masks | df['area_clean'].str.contains(a)
    return df[masks]

def get_chart_data(df, value_column='price'):
    subset = df.groupby('year')[value_column].mean().reset_index()
    return subset.to_dict(orient='records')

def make_summary_text(df, areas):
    if df.empty:
        return f"No data found for {', '.join(areas)}."

    avg_price = df['price'].mean()
    avg_demand = df['demand'].mean()

    return (
        f"Summary for {', '.join(areas)}: "
        f"Avg Price = {avg_price:,.0f}, "
        f"Avg Demand = {avg_demand:.0f}."
    )
