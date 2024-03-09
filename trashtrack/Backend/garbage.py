import cv2
import numpy as np
import os

# Load a pre-trained garbage detection model or define detection methods

# Function to perform garbage detection on an image
def perform_garbage_detection(image):
    # Example: Convert image to grayscale
    gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    
    # Apply thresholding to extract garbage regions based on color intensity
    _, thresh = cv2.threshold(gray, 150, 255, cv2.THRESH_BINARY)
    
    # Find contours in the thresholded image
    contours, _ = cv2.findContours(thresh, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
    
    # Iterate through each contour
    for contour in contours:
        # Calculate the area of the contour
        area = cv2.contourArea(contour)
        
        # Filter out small contours (noise)
        if area > 100:
            # Draw a bounding box around the contour
            x, y, w, h = cv2.boundingRect(contour)
            cv2.rectangle(image, (x, y), (x + w, y + h), (0, 255, 0), 2)
    
    return image

# Check for the existence of the "./uploads" directory
uploads_directory = "./uploads"
if not os.path.exists(uploads_directory):
    os.makedirs(uploads_directory)

while True:
    # Check for files in the "./uploads" directory
    files = os.listdir(uploads_directory)

    if files:
        # Process the first file in the directory
        file_path = os.path.join(uploads_directory, files[0])
        
        # Read the image from the file
        image = cv2.imread(file_path)

        # Perform garbage detection on the image
        result_image = perform_garbage_detection(image)

        # Get the screen width and height
        screen_width, screen_height = 1920, 1080  # Adjust these values based on your screen resolution

        # Resize the result image to fit the screen
        result_image = cv2.resize(result_image, (screen_width, screen_height))

        # Create a window with full-screen properties
        cv2.namedWindow('Garbage Detection', cv2.WINDOW_NORMAL)
        cv2.setWindowProperty('Garbage Detection', cv2.WND_PROP_FULLSCREEN, cv2.WINDOW_FULLSCREEN)

        # Display the result with garbage detection overlay
        cv2.imshow('Garbage Detection', result_image)

        # Remove the processed file from the directory
        os.remove(file_path)

    # Break the loop if 'q' is pressed
    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

# Release OpenCV windows
cv2.destroyAllWindows()