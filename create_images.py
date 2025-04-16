from PIL import Image, ImageDraw, ImageFont
import random
import os

# Create images directory if it doesn't exist
os.makedirs('/home/ubuntu/drone_website/images', exist_ok=True)

# Create logo (pfp.jpeg)
def create_logo():
    # Create a 200x200 image with a dark background
    img = Image.new('RGB', (200, 200), color=(40, 40, 40))
    draw = ImageDraw.Draw(img)
    
    # Draw a simple drone silhouette
    # Main body
    draw.rectangle([(80, 90), (120, 110)], fill=(220, 30, 30))
    
    # Arms
    draw.rectangle([(50, 85), (150, 95)], fill=(180, 180, 180))
    draw.rectangle([(75, 60), (85, 140)], fill=(180, 180, 180))
    draw.rectangle([(115, 60), (125, 140)], fill=(180, 180, 180))
    
    # Propellers
    for x, y in [(50, 70), (150, 70), (50, 130), (150, 130)]:
        draw.ellipse([(x-10, y-10), (x+10, y+10)], fill=(100, 100, 100))
    
    # Add text "SkyDrone"
    # Since we might not have fonts available, we'll draw text manually
    draw.text((60, 150), "SkyDrone", fill=(255, 255, 255))
    
    # Save the image
    img.save('/home/ubuntu/drone_website/images/pfp.jpeg')
    print("Logo created: pfp.jpeg")

# Create hero background (1.jpeg)
def create_hero_background():
    # Create a 1200x800 image with a gradient background
    width, height = 1200, 800
    img = Image.new('RGB', (width, height))
    draw = ImageDraw.Draw(img)
    
    # Create a dark gradient background
    for y in range(height):
        # Create a gradient from dark blue to dark purple
        r = int(20 + (y / height) * 40)
        g = int(20 + (y / height) * 10)
        b = int(50 + (y / height) * 30)
        draw.line([(0, y), (width, y)], fill=(r, g, b))
    
    # Add some "drone flight" lines
    for _ in range(20):
        x1 = random.randint(0, width)
        y1 = random.randint(0, height)
        x2 = x1 + random.randint(-200, 200)
        y2 = y1 + random.randint(-200, 200)
        draw.line([(x1, y1), (x2, y2)], fill=(255, 255, 255, 128), width=1)
    
    # Add some "stars" or "lights"
    for _ in range(100):
        x = random.randint(0, width)
        y = random.randint(0, height)
        size = random.randint(1, 3)
        draw.ellipse([(x-size, y-size), (x+size, y+size)], fill=(255, 255, 255, 180))
    
    # Save the image
    img.save('/home/ubuntu/drone_website/images/1.jpeg')
    print("Hero background created: 1.jpeg")

# Create drone model images (2.jpeg through 7.jpeg)
def create_drone_images():
    # We'll create 6 different drone model images
    for i in range(2, 8):
        # Create a 400x300 image with a gradient background
        width, height = 400, 300
        img = Image.new('RGB', (width, height))
        draw = ImageDraw.Draw(img)
        
        # Background color based on drone model
        colors = [
            (30, 30, 60),  # Dark blue
            (60, 30, 30),  # Dark red
            (30, 60, 30),  # Dark green
            (60, 30, 60),  # Dark purple
            (60, 60, 30),  # Dark yellow
            (30, 60, 60),  # Dark cyan
        ]
        bg_color = colors[i-2]
        
        # Fill background
        draw.rectangle([(0, 0), (width, height)], fill=bg_color)
        
        # Draw a drone silhouette - different for each model
        center_x, center_y = width // 2, height // 2
        
        # Main body - different shapes for different models
        if i % 3 == 0:
            # Rectangular body
            draw.rectangle([
                (center_x - 40, center_y - 20),
                (center_x + 40, center_y + 20)
            ], fill=(200, 200, 200))
        elif i % 3 == 1:
            # Circular body
            draw.ellipse([
                (center_x - 30, center_y - 30),
                (center_x + 30, center_y + 30)
            ], fill=(200, 200, 200))
        else:
            # Hexagonal body (approximated)
            draw.polygon([
                (center_x - 30, center_y),
                (center_x - 15, center_y - 25),
                (center_x + 15, center_y - 25),
                (center_x + 30, center_y),
                (center_x + 15, center_y + 25),
                (center_x - 15, center_y + 25)
            ], fill=(200, 200, 200))
        
        # Arms - different configurations
        arm_length = 60 + (i * 5)
        arm_positions = []
        
        if i % 2 == 0:  # Quadcopter
            arm_positions = [
                (center_x - arm_length, center_y - arm_length),
                (center_x + arm_length, center_y - arm_length),
                (center_x - arm_length, center_y + arm_length),
                (center_x + arm_length, center_y + arm_length)
            ]
            # Draw arms
            for x, y in arm_positions:
                draw.line([(center_x, center_y), (x, y)], fill=(150, 150, 150), width=5)
                # Draw propellers
                draw.ellipse([(x-10, y-10), (x+10, y+10)], fill=(100, 100, 100))
        else:  # Hexacopter
            for angle in range(0, 360, 60):
                rad = angle * 3.14159 / 180
                x = center_x + int(arm_length * 0.8 * (angle % 120) / 60 * (1 if angle < 180 else -1))
                y = center_y + int(arm_length * 0.8 * (1 if 60 <= angle % 180 <= 120 else -1))
                draw.line([(center_x, center_y), (x, y)], fill=(150, 150, 150), width=5)
                # Draw propellers
                draw.ellipse([(x-10, y-10), (x+10, y+10)], fill=(100, 100, 100))
        
        # Add some details specific to each model
        if i == 2:
            # Camera
            draw.rectangle([(center_x - 10, center_y + 20), (center_x + 10, center_y + 35)], fill=(50, 50, 50))
        elif i == 3:
            # Antenna
            draw.line([(center_x, center_y - 30), (center_x, center_y - 50)], fill=(100, 100, 100), width=2)
        elif i == 4:
            # LED lights
            for x, y in arm_positions:
                draw.ellipse([(x-5, y-5), (x+5, y+5)], fill=(255, 0, 0))
        elif i == 5:
            # Extra sensors
            draw.ellipse([(center_x - 15, center_y - 40), (center_x + 15, center_y - 25)], fill=(70, 70, 70))
        elif i == 6:
            # Landing gear
            draw.rectangle([(center_x - 40, center_y + 30), (center_x - 30, center_y + 50)], fill=(80, 80, 80))
            draw.rectangle([(center_x + 30, center_y + 30), (center_x + 40, center_y + 50)], fill=(80, 80, 80))
        elif i == 7:
            # Battery pack
            draw.rectangle([(center_x - 20, center_y - 40), (center_x + 20, center_y - 25)], fill=(60, 60, 60))
        
        # Save the image
        img.save(f'/home/ubuntu/drone_website/images/{i}.jpeg')
        print(f"Drone image created: {i}.jpeg")

# Create feature icons
def create_feature_icons():
    # Create 4 simple feature icons
    icons = [
        ("feature1.png", "High Quality"),
        ("feature2.png", "Fly Anywhere"),
        ("feature3.png", "Services"),
        ("feature4.png", "Training")
    ]
    
    for filename, label in icons:
        # Create a 100x100 image with transparent background
        img = Image.new('RGBA', (100, 100), color=(0, 0, 0, 0))
        draw = ImageDraw.Draw(img)
        
        # Draw a circle background
        draw.ellipse([(10, 10), (90, 90)], fill=(220, 30, 30, 200))
        
        # Draw a simple icon based on the label
        if "Quality" in label:
            # Camera icon
            draw.rectangle([(30, 30), (70, 60)], fill=(255, 255, 255))
            draw.ellipse([(45, 35), (55, 45)], fill=(0, 0, 0))
            draw.rectangle([(40, 60), (60, 70)], fill=(255, 255, 255))
        elif "Anywhere" in label:
            # Globe icon
            draw.ellipse([(25, 25), (75, 75)], fill=(255, 255, 255))
            draw.line([(25, 50), (75, 50)], fill=(100, 100, 100), width=2)
            draw.line([(50, 25), (50, 75)], fill=(100, 100, 100), width=2)
            draw.arc([(30, 30), (70, 70)], 0, 360, fill=(100, 100, 100), width=2)
        elif "Services" in label:
            # Tools icon
            draw.rectangle([(30, 30), (50, 70)], fill=(255, 255, 255))
            draw.rectangle([(50, 40), (70, 60)], fill=(255, 255, 255))
        elif "Training" in label:
            # Graduation cap
            draw.polygon([(30, 60), (50, 40), (70, 60), (50, 80)], fill=(255, 255, 255))
            draw.rectangle([(45, 30), (55, 40)], fill=(255, 255, 255))
        
        # Save the image
        img.save(f'/home/ubuntu/drone_website/images/{filename}')
        print(f"Feature icon created: {filename}")

# Run all image creation functions
create_logo()
create_hero_background()
create_drone_images()
create_feature_icons()

print("All images created successfully!")
