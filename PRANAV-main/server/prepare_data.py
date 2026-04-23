import os
import shutil
from pathlib import Path

# Paths to the downloaded Kaggle datasets
KAGGLE_CACHE = Path.home() / '.cache' / 'kagglehub' / 'datasets'
PLANT_DISEASE_1 = KAGGLE_CACHE / 'rashikrahmanpritom' / 'plant-disease-recognition-dataset' / 'versions' / '1' / 'Train' / 'Train'
PLANT_DISEASE_2 = KAGGLE_CACHE / 'vipoooool' / 'new-plant-diseases-dataset' / 'versions' / '2' / 'New Plant Diseases Dataset(Augmented)' / 'New Plant Diseases Dataset(Augmented)' / 'train'
TREES_NEAR_WIRES = KAGGLE_CACHE / 'saurabhshahane' / 'detecting-trees-near-electric-wires' / 'versions' / '1'
POWER_FAULTS = KAGGLE_CACHE / 'ziya07' / 'power-system-faults-dataset' / 'versions' / '1'

# Target structure
TARGET_DIR = Path('dataset')
CLASSES = [
    'Tree_is_healthy',
    'Tree_has_disease',
    'Power_line_safe',
    'Power_line_anomaly_detected'
]

def prepare_directories():
    for c in CLASSES:
        (TARGET_DIR / c).mkdir(parents=True, exist_ok=True)
        print(f"Created directory: {TARGET_DIR / c}")

def copy_files_with_limit(src_dir, target_class, max_files=500):
    src_dir = Path(src_dir)
    if not src_dir.exists():
        print(f"Warning: Source directory not found: {src_dir}")
        return
        
    dest_dir = TARGET_DIR / target_class
    count = 0
    
    # Recursively find all images
    for ext in ['*.jpg', '*.jpeg', '*.png']:
        for file_path in src_dir.rglob(ext):
            if count >= max_files:
                break
                
            dest_path = dest_dir / f"{src_dir.name}_{count}{file_path.suffix}"
            try:
                shutil.copy2(file_path, dest_path)
                count += 1
            except Exception as e:
                print(f"Error copying {file_path}: {e}")
                
    print(f"Copied {count} files to {target_class}")

def main():
    print("Preparing Unified Dataset for CNN Training...")
    prepare_directories()
    
    # 1. Normal Trees (from healthy classes in plant disease datasets)
    print("Collecting Normal Trees...")
    if PLANT_DISEASE_1.exists():
        copy_files_with_limit(PLANT_DISEASE_1 / 'Healthy', 'Tree_is_healthy', 300)
    
    # 2. Diseased Trees (from diseased classes in plant disease datasets)
    print("Collecting Diseased Trees...")
    if PLANT_DISEASE_1.exists():
        copy_files_with_limit(PLANT_DISEASE_1 / 'Rust', 'Tree_has_disease', 150)
        copy_files_with_limit(PLANT_DISEASE_1 / 'Powdery', 'Tree_has_disease', 150)
        
    # 3. Healthy Infrastructure & Faulty Power Line
    # Because 'detecting-trees-near-electric-wires' might not be perfectly classified,
    # we'll broadly map some folders if they exist.
    print("Collecting Infrastructure & Power Line Images...")
    copy_files_with_limit(TREES_NEAR_WIRES, 'Power_line_safe', 300)
    copy_files_with_limit(POWER_FAULTS, 'Power_line_anomaly_detected', 300)

    print("\nDataset Preparation Complete!")
    print(f"Dataset location: {TARGET_DIR.absolute()}")

if __name__ == '__main__':
    main()
