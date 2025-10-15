# utils.py
import os
from PIL import Image
import numpy as np
from config import IMG_SIZE, HIST_BINS, LBP_POINTS, LBP_RADIUS
from scipy.signal import convolve2d  # moved import here for clarity

# ✅ Consistent naming
def allowed_file(filename):
    """Check if uploaded file is a valid image type."""
    ext = filename.lower().split('.')[-1]
    return ext in ('jpg', 'jpeg', 'png')


def load_image_rgb(path, size=IMG_SIZE):
    """Load image in RGB and resize."""
    img = Image.open(path).convert("RGB")
    img = img.resize(size, Image.BILINEAR)
    arr = np.asarray(img, dtype=np.float32) / 255.0
    return arr  # shape (H, W, 3)


def color_histograms(arr, bins=HIST_BINS):
    """Compute normalized color histograms for each RGB channel."""
    hist_features = []
    for c in range(3):
        hist, _ = np.histogram(arr[:, :, c], bins=bins, range=(0, 1))
        hist = hist.astype(np.float32)
        hist = hist / (hist.sum() + 1e-8)
        hist_features.append(hist)
    return np.concatenate(hist_features)


def lbp_grayscale(arr_gray):
    """Local Binary Pattern (texture descriptor)."""
    arr_gray = arr_gray.astype(np.float32)
    h, w = arr_gray.shape
    out = np.zeros((h - 2, w - 2), dtype=np.uint16)
    pattern_bits = [
        (-1, -1, 1), (-1, 0, 2), (-1, 1, 4),
        (0, 1, 8), (1, 1, 16), (1, 0, 32),
        (1, -1, 64), (0, -1, 128)
    ]
    center = arr_gray[1:h - 1, 1:w - 1]
    for dy, dx, bit in pattern_bits:
        neighbor = arr_gray[1 + dy:h - 1 + dy, 1 + dx:w - 1 + dx]
        mask = (neighbor >= center).astype(np.uint16)
        out += mask * bit

    out = np.clip(out, 0, 255).astype(np.uint8)
    hist, _ = np.histogram(out.ravel(), bins=32, range=(0, 256))
    hist = hist.astype(np.float32)
    hist = hist / (hist.sum() + 1e-8)
    return hist


def gradient_energy(arr_gray):
    """Compute gradient magnitude histogram."""
    Kx = np.array([[-1, 0, 1], [-2, 0, 2], [-1, 0, 1]], dtype=np.float32)
    Ky = Kx.T
    gx = convolve2d(arr_gray, Kx, mode='valid', boundary='symm')
    gy = convolve2d(arr_gray, Ky, mode='valid', boundary='symm')
    mag = np.sqrt(gx * gx + gy * gy)
    hist, _ = np.histogram(mag.ravel(), bins=16, range=(0, mag.max() + 1e-8))
    hist = hist.astype(np.float32)
    hist = hist / (hist.sum() + 1e-8)
    return hist


def extract_features(image_path):
    """
    Extracts robust features from the image.
    Combines color, texture, gradient, and statistical features.
    """
    try:
        arr = load_image_rgb(image_path)
        small = Image.fromarray((arr * 255).astype(np.uint8)).resize((32, 32), Image.BILINEAR)
        small_arr = np.asarray(small, dtype=np.float32) / 255.0
        pixel_feat = small_arr.flatten()  # 32*32*3 = 3072

        hist_feat = color_histograms(arr, bins=HIST_BINS)
        gray = np.dot(arr, [0.2989, 0.5870, 0.1140])
        lbp_feat = lbp_grayscale(gray)

        try:
            grad_feat = gradient_energy(gray)
        except Exception:
            gx = np.diff(gray, axis=1)
            gy = np.diff(gray, axis=0)
            mag = np.sqrt(gx[:, :-1] ** 2 + gy[:-1, :] ** 2)
            hist, _ = np.histogram(mag.ravel(), bins=16, range=(0, mag.max() + 1e-8))
            grad_feat = hist.astype(np.float32)
            grad_feat = grad_feat / (grad_feat.sum() + 1e-8)

        mean_rgb = arr.mean(axis=(0, 1))
        std_rgb = arr.std(axis=(0, 1))

        features = np.concatenate([
            pixel_feat,
            hist_feat,
            lbp_feat,
            grad_feat,
            mean_rgb,
            std_rgb
        ]).astype(np.float32)

        return features
    except Exception as e:
        print("❌ extract_features error:", e, "for", image_path)
        return None
