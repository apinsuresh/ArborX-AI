import os
import numpy as np
import tensorflow as tf
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Conv2D, MaxPooling2D, Flatten, Dense, Dropout, Rescaling, RandomFlip, RandomRotation, RandomZoom
from tensorflow.keras.preprocessing import image_dataset_from_directory
import matplotlib.pyplot as plt
from sklearn.metrics import classification_report, confusion_matrix
import seaborn as sns

# Parameters
BATCH_SIZE = 32
IMG_SIZE = (128, 128)
DATASET_DIR = 'dataset'
EPOCHS = 15

def build_model(num_classes):
    model = Sequential([
        # Data Augmentation (Rotation, Zoom, Flip)
        RandomFlip("horizontal", input_shape=(128, 128, 3)),
        RandomRotation(0.1),
        RandomZoom(0.1),
        
        # Preprocessing: Normalize pixel values (0 to 1)
        Rescaling(1./255),
        
        # Conv2D + ReLU and MaxPooling
        Conv2D(32, 3, padding='same', activation='relu'),
        MaxPooling2D(),
        
        Conv2D(64, 3, padding='same', activation='relu'),
        MaxPooling2D(),
        
        Conv2D(128, 3, padding='same', activation='relu'),
        MaxPooling2D(),
        
        # Flatten and Fully Connected Dense Layers
        Flatten(),
        Dense(128, activation='relu'),
        
        # Dropout
        Dropout(0.5),
        
        # Final layer with Softmax (4 classes)
        Dense(num_classes, activation='softmax')
    ])
    
    model.compile(
        optimizer='adam',
        loss='categorical_crossentropy',
        metrics=['accuracy']
    )
    return model

def plot_and_save_metrics(history):
    acc = history.history['accuracy']
    val_acc = history.history['val_accuracy']
    loss = history.history['loss']
    val_loss = history.history['val_loss']
    epochs_range = range(EPOCHS)

    plt.figure(figsize=(12, 6))
    plt.subplot(1, 2, 1)
    plt.plot(epochs_range, acc, label='Training Accuracy')
    plt.plot(epochs_range, val_acc, label='Validation Accuracy')
    plt.legend(loc='lower right')
    plt.title('Training and Validation Accuracy')

    plt.subplot(1, 2, 2)
    plt.plot(epochs_range, loss, label='Training Loss')
    plt.plot(epochs_range, val_loss, label='Validation Loss')
    plt.legend(loc='upper right')
    plt.title('Training and Validation Loss')
    plt.savefig('evaluation_metrics.png')
    print("Saved evaluation metrics plot to evaluation_metrics.png")

def evaluate_and_predict(model, val_dataset, class_names):
    print("\n--- Evaluation on Validation Set ---")
    
    # Get true labels and predictions for Classification Report and Confusion Matrix
    y_true = []
    y_pred = []
    
    for images, labels in val_dataset:
        y_true.extend(np.argmax(labels.numpy(), axis=-1))
        preds = model.predict(images, verbose=0)
        y_pred.extend(np.argmax(preds, axis=-1))
        
    print("\nClassification Report:")
    print(classification_report(y_true, y_pred, target_names=class_names, zero_division=0))
    
    print("\nConfusion Matrix:")
    cm = confusion_matrix(y_true, y_pred)
    print(cm)
    
    # Prediction on a single test image (taking first image from validation batch)
    print("\n--- Testing Single Prediction ---")
    for images, labels in val_dataset.take(1):
        single_image = images[0:1] # shape (1, 128, 128, 3)
        actual_class = class_names[np.argmax(labels[0])]
        
        predictions = model.predict(single_image, verbose=0)
        confidence = float(np.max(predictions[0])) * 100
        predicted_class_idx = np.argmax(predictions[0])
        predicted_class = class_names[predicted_class_idx]
        
        # Formatting to match prompt requirement
        formatted_pred_class = predicted_class.replace('_', ' ')
        print(f"Testing with image of actual class: {actual_class}")
        print(f"Output result:")
        print(f'"{formatted_pred_class} (Confidence: {confidence:.1f}%)"')
        break

def main():
    print("Loading dataset from directory...")
    
    if not os.path.exists(DATASET_DIR):
        print(f"Error: Dataset directory '{DATASET_DIR}' not found!")
        print("Please run `python prepare_data.py` first to generate the structured dataset folders.")
        return

    # Create training and validation datasets
    train_dataset = image_dataset_from_directory(
        DATASET_DIR,
        validation_split=0.2,
        subset="training",
        seed=123,
        image_size=IMG_SIZE,
        batch_size=BATCH_SIZE,
        label_mode='categorical'
    )
    
    val_dataset = image_dataset_from_directory(
        DATASET_DIR,
        validation_split=0.2,
        subset="validation",
        seed=123,
        image_size=IMG_SIZE,
        batch_size=BATCH_SIZE,
        label_mode='categorical'
    )
    
    class_names = train_dataset.class_names
    print(f"Detected classes: {class_names}")
    
    # Optimization for performance
    AUTOTUNE = tf.data.AUTOTUNE
    train_dataset = train_dataset.prefetch(buffer_size=AUTOTUNE)
    val_dataset = val_dataset.prefetch(buffer_size=AUTOTUNE)
    
    print("\nBuilding Custom CNN model...")
    model = build_model(num_classes=len(class_names))
    model.summary()
    
    print("\nStarting training phase...")
    history = model.fit(
        train_dataset,
        validation_data=val_dataset,
        epochs=EPOCHS
    )
    
    # Evaluation and metrics
    plot_and_save_metrics(history)
    evaluate_and_predict(model, val_dataset, class_names)
    
    print("\nTraining complete! Saving model to model.h5...")
    model.save('model.h5')
    print("Saved successfully. The backend will automatically use this model on next startup.")

if __name__ == '__main__':
    main()
