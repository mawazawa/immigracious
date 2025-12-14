#!/usr/bin/env python3
"""
Generate infographics for Immigracious using Gemini 2.5 Flash Image
"""

from google import genai
from google.genai import types
from pathlib import Path
import base64

# Configure API
API_KEY = "AIzaSyBqm--kPMt-q9xcE2kJ-fxejSXjWA5P6sA"
client = genai.Client(api_key=API_KEY)

# Output directory
OUTPUT_DIR = Path("/Users/mathieuwauters/Desktop/code/immigracious/assets/infographics")
OUTPUT_DIR.mkdir(parents=True, exist_ok=True)

# Infographic prompts optimized for Gemini
INFOGRAPHICS = {
    "01_interview_room_layout": """
A clean, minimal top-down architectural floor plan diagram of a USCIS immigration interview room.
White background with teal (#0d9488) furniture outlines.
Shows: Officer's desk with computer at back wall, two visitor chairs facing desk labeled "You" and "Spouse",
door on left wall, American flag in corner, filing cabinet on right wall.
Labels in clean sans-serif font. Professional infographic style, crisp lines, no decorative elements.
Architectural blueprint aesthetic.
""",

    "02_process_timeline": """
A horizontal timeline infographic showing green card interview process.
5 connected circular nodes on a teal (#0d9488) line:
1. "File I-485" with document icon
2. "Biometrics" with fingerprint icon
3. "Interview Notice" with envelope icon
4. "Interview Day" with building icon
5. "Decision" with checkmark icon
Modern flat design, white background, clean sans-serif typography.
Title: "GREEN CARD INTERVIEW TIMELINE"
Professional business infographic style.
""",

    "03_day_of_checklist": """
An elegant three-column checklist card for interview preparation.
Warm cream background (#fef3c7), teal (#0d9488) headers.
Column 1 "BRING": briefcase icon, items like Interview Notice, ID, Passport
Column 2 "WEAR": shirt icon, items like Business casual, Clean clothes
Column 3 "DO": checkmark icon, items like Arrive early, Make eye contact
Empty checkbox squares next to each item.
Title: "INTERVIEW DAY CHECKLIST"
Rounded corners, subtle shadow. Print-ready quality infographic.
""",

    "04_outcome_flowchart": """
A vertical flowchart showing outcomes after green card interview.
Dark background (#1f2937) with white connecting lines.
Top node: "Interview Complete" in gray.
5 color-coded outcome cards below:
- "APPROVED" in green (#059669)
- "PENDING" in blue (#3b82f6)
- "RFE ISSUED" in yellow (#eab308)
- "STOKES INTERVIEW" in orange (#f97316)
- "DENIED" in red (#dc2626)
Modern infographic style. Title: "WHAT HAPPENS AFTER YOUR INTERVIEW?"
"""
}

def generate_infographic(name: str, prompt: str) -> str:
    """Generate a single infographic using Gemini 2.5 Flash Image"""
    print(f"\n{'='*60}")
    print(f"Generating: {name}")
    print(f"{'='*60}")

    try:
        # Use Gemini 2.5 Flash Image model
        response = client.models.generate_content(
            model="gemini-2.5-flash-image",
            contents=prompt,
            config=types.GenerateContentConfig(
                response_modalities=["IMAGE", "TEXT"]
            )
        )

        # Save the image
        output_path = OUTPUT_DIR / f"{name}.png"

        if response.candidates and response.candidates[0].content.parts:
            for part in response.candidates[0].content.parts:
                if hasattr(part, 'inline_data') and part.inline_data:
                    # Decode and save image
                    image_data = part.inline_data.data
                    if isinstance(image_data, str):
                        image_data = base64.b64decode(image_data)
                    with open(output_path, "wb") as f:
                        f.write(image_data)
                    print(f"✅ Saved: {output_path}")
                    return str(output_path)
                elif hasattr(part, 'text') and part.text:
                    print(f"Text: {part.text[:100]}...")

        print(f"⚠️ No image generated for {name}")
        return None

    except Exception as e:
        print(f"❌ Error generating {name}: {e}")
        import traceback
        traceback.print_exc()
        return None

def main():
    print("\n" + "="*60)
    print("IMMIGRACIOUS INFOGRAPHIC GENERATOR")
    print("Using Gemini 2.5 Flash Image")
    print("="*60)

    results = []

    for name, prompt in INFOGRAPHICS.items():
        result = generate_infographic(name, prompt)
        results.append((name, result))

    print("\n" + "="*60)
    print("GENERATION COMPLETE")
    print("="*60)

    for name, path in results:
        status = "✅" if path else "❌"
        print(f"{status} {name}")

    print(f"\nOutput directory: {OUTPUT_DIR}")

if __name__ == "__main__":
    main()
