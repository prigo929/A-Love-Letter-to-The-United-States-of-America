#!/usr/bin/env python3
import os

FILES = [
    # Map components
    "components/infrastructure/PortMap.tsx",
    "components/infrastructure/DamsBridgesMap.tsx",
    "components/infrastructure/AirportMap.tsx",
    "components/infrastructure/NetworkMap.tsx",
    
    # Chart/Anatomy components
    "components/infrastructure/WaterwayComparison.tsx",
    "components/infrastructure/EngineeringComparison.tsx",
    "components/infrastructure/AnatomyDiagram.tsx",
    "components/infrastructure/InterchangeTypology.tsx",
    "components/infrastructure/InfraMotion.tsx",
    
    # Page layouts
    "app/infrastructure/maritime-ports/page.tsx",
    "app/infrastructure/aqueducts-waterways/page.tsx",
    "app/infrastructure/dams-bridges/page.tsx",
    "app/infrastructure/aviation-hubs/page.tsx",
    "app/infrastructure/highway-system/page.tsx",
    "app/infrastructure/power-grid/page.tsx",
    "app/infrastructure/rail-network/page.tsx",
    "app/infrastructure/page.tsx"
]

def clean_file(path):
    if not os.path.exists(path):
        print(f"Skipping: {path} (not found)")
        return
    with open(path, "r") as f:
        content = f.read()
    
    # Substitutions
    # 1. replace font-macro-mono class with font-sans
    new_content = content.replace("font-macro-mono", "font-sans")
    # 2. replace inline fontFamily font-mono
    new_content = new_content.replace('fontFamily: "var(--font-mono), monospace"', 'fontFamily: "var(--font-sans), sans-serif"')
    new_content = new_content.replace('fontFamily: "var(--font-mono),monospace"', 'fontFamily: "var(--font-sans), sans-serif"')
    new_content = new_content.replace("var(--font-mono)", "var(--font-sans)")
    # 3. replace standard font-mono class
    new_content = new_content.replace("font-mono", "font-sans")
    
    if new_content != content:
        with open(path, "w") as f:
            f.write(new_content)
        print(f"Cleaned: {path}")
    else:
        print(f"No changes needed: {path}")

def main():
    print("Cleaning monospace fonts from all infrastructure pages and components...")
    for f in FILES:
        clean_file(f)

if __name__ == "__main__":
    main()
