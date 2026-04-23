import kagglehub
import os

# Download latest version
path = kagglehub.dataset_download("ziya07/power-system-faults-dataset")
print("Path to dataset files:", path)
