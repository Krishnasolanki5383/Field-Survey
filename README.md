# Smart Field Survey and Inspection App

Smart Field Survey is a mobile application built for field inspectors, surveyors, and engineers to capture site details, record GPS location coordinates, take timestamped inspection photos, manage contacts, and manage survey reports.

---

## Technologies Used

### Core Framework and Runtime
* React Native (v0.81.5) - Cross-platform native mobile application framework
* Expo SDK (v54.0.35) - Development platform and native tooling for React Native
* React (v19.1.0) - Declarative UI component builder
* TypeScript (v5.9.2) - Strongly typed JavaScript language support

### Navigation and Routing
* Expo Router (v6.0.24) - File-based routing system for React Native apps
* React Navigation Bottom Tabs (v7.4.0) - Bottom tab bar navigation interface
* React Navigation Drawer (v7.13.2) - Side drawer navigation menu
* React Native Reanimated (v4.1.1) & Gesture Handler (v2.28.0) - Smooth animations and touch gesture handling

### Native Hardware Modules and APIs
* expo-camera (v17.0.10) - Hardware camera access, photo capture, preview, and attachment workflow
* expo-location (v19.0.8) - High-accuracy GPS location retrieval (Latitude, Longitude, Altitude, Accuracy)
* expo-contacts (v15.0.11) - Device contact book access, searching, and phone extraction
* expo-clipboard (v8.0.8) - System clipboard reading, writing, and clearing
* expo-haptics (v15.0.8) - Haptic feedback for touch interactions

### State Management and UI Design
* React Context API (SurveyContext) - Centralized global state management for surveys, photos, profiles, and statistics
* Ionicons (@expo/vector-icons) - Vector icons for navigation and actions
* React Navigation ThemeProvider - Light and dark mode support

---

## Hot Features

### 1. Interactive Inspection Dashboard
* Dynamic Greeting: Displays time-aware greetings based on the hour of the day.
* Live Inspector Profile Badge: Displays verified inspector details including ID number, course specialization, department, and active status indicator.
* Real-Time Daily Metrics: Tracks completed daily surveys against target goals with a visual progress completion circle.
* Recent Surveys Summary: View recent site checkups with priority indicators (High, Medium, Low) and status tracking (Completed, In Progress, Pending).

### 2. Native Camera Module
* Built-in Camera Interface: Capture site photos directly inside the app without third-party camera reliance.
* Instant Photo Preview: Preview captured images with automatic timestamp recording.
* Photo Attachment Workflow: Attach captured site images directly into new survey reports.
* Action Controls: Option to retake, delete, or confirm photo attachment with alert prompts.

### 3. High-Precision GPS Location Module
* Real-Time Coordinate Fetching: Obtain live GPS coordinates including Latitude, Longitude, Altitude, and Accuracy meters.
* One-Tap Location Copy: Instantly format and copy live GPS coordinates to system clipboard for reports.
* Permission Handling: Handles location permissions with direct settings link prompts if access is denied.

### 4. Contacts Inspector Module
* Device Contacts Integration: Access device contacts directly for assigning client or site contacts.
* Real-Time Search: Instant text filtering by contact name.
* Initial Avatars & Phone Extraction: Auto-generates initials avatar badges and formats contact numbers.
* Quick Copy: One-tap copying of contact phone numbers to clipboard.

### 5. Clipboard Utilities Module
* Multi-Action Clipboard Management: Copy pre-formatted Survey IDs, contact numbers, and live GPS coordinates with one tap.
* Paste & Edit Notes: Paste clipboard text into survey description/notes fields effortlessly.
* System Clipboard Wipe: Feature to clear system-wide clipboard data securely.

### 6. Survey Entry Form & Inspection Management
* Comprehensive Form Fields: Input Site Name, Client Name, Priority level, Date, and Description.
* Attach Camera Photo: Links pending camera captures to new survey entries.
* Survey History: View and manage past logged surveys across the application.

### 7. Dual Navigation System
* Combines top drawer sidebar menu and bottom navigation tabs for rapid switching between modules.

---

## Getting Started

### Prerequisites
* Node.js (v18 or higher recommended)
* npm or yarn package manager
* Expo Go app on iOS/Android device OR an Android Emulator / iOS Simulator

### Installation

1. Clone or navigate to the project repository:
   ```bash
   cd Field-Survey/Frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the Expo development server:
   ```bash
   npx expo start
   ```

4. Run on your preferred platform:
   * Press `a` to open Android Emulator
   * Press `i` to open iOS Simulator
   * Press `w` to run in web browser
   * Scan the QR code using Expo Go app on your physical mobile device

---

## Project Structure

```
Frontend/
├── app/                  # File-based routes (Expo Router)
│   ├── (tabs)/           # Main tab screens (Dashboard, Profile, Reports, History)
│   ├── _layout.tsx       # Root layout with Drawer navigation & SurveyProvider
│   ├── camera.tsx        # Camera module screen
│   ├── clipboard.tsx     # Clipboard utilities screen
│   ├── contacts.tsx      # Contacts module screen
│   ├── location.tsx       # GPS location module screen
│   └── survey.tsx        # New survey form screen
├── components/           # Reusable UI components (Form, Location, Contacts)
├── context/              # SurveyContext provider for global state
├── hooks/                # Custom React hooks (Theme hooks)
└── package.json          # Dependencies and scripts
```

---

## License

Private and Confidential - Smart Field Survey Application.
