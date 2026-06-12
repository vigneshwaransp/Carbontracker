# EcoTrack — Carbon Footprint Tracker

EcoTrack is a premium, fully-functional web application designed to help individuals understand, track, and reduce their carbon footprint through personalized insights, simple daily actions, and gamified eco-challenges. It is built as a single-page application using React, TypeScript, Vite, and CSS Neumorphic styling.

🌐 **Live Deployed Web Application**: [https://carbontracker-nu.vercel.app](https://carbontracker-nu.vercel.app)

---

## 1. Chosen Vertical: Personal Sustainability & Climate Action

To solve the challenge of individuals wanting to reduce their environmental impact but not knowing how, EcoTrack targets the **Personal Sustainability** vertical. The application is divided into three key steps:
1. **Onboarding & Baseline**: Capture lifestyle factors across Transport, Home Energy, Food, and Shopping.
2. **Analysis & Dashboard**: Present a visual breakdown of emissions, comparison benchmarks, and an overall letter grade.
3. **Action & Gamification**: Generate personalized tips sorted by high-impact areas and present daily eco-challenges with a gamified points counter.

---

## 2. Approach & Logic

### Carbon Footprint Calculation
Calculations are executed locally using reputable emission coefficients derived from the Environmental Protection Agency (EPA) and academic research. All factors are stored in `src/data/emissionFactors.ts`.
* **Transport**:
  * **Car**: `Miles/week * 52 * Factor (depending on fuel type: gasoline, diesel, hybrid, electric)`.
  * **Public Transit**: `Hours/week * 52 * 0.12 kg CO₂/hour`.
  * **Flights**: `Round-trips/year * 900 kg CO₂/flight`.
* **Home Energy**:
  * **Electricity**: `kWh/month * 12 * 0.38 kg CO₂/kWh`.
  * **Natural Gas**: `Therms/month * 12 * 5.3 kg CO₂/therm`.
  * *Divided by household size to reflect shared utility efficiency.*
* **Food**:
  * **Diet**: Base annual carbon cost depending on diet type (e.g., Meat Heavy: `3300 kg`, Vegan: `1100 kg`).
  * **Locally Sourced**: Up to `10%` reduction based on local food purchase percentage.
* **Shopping**:
  * **Clothing**: `Items/month * 12 * 14.2 kg CO₂/item`.
  * **Electronics**: `Items/year * 80 kg CO₂/item`.

### Personalized Recommendation Engine
Instead of showing generic lists, the recommendation engine (in `src/utils/tipEngine.ts`):
1. Calculates user emissions across all four categories.
2. Sorts categories in descending order of impact.
3. Recommends tips belonging to the user's **highest-impact categories first**.
4. Filters out irrelevant tips based on onboarding data (e.g., does not recommend buying an EV if the user already drives electric, does not recommend skipping flights if they do not fly, and does not recommend a vegetarian diet if they are already vegan/vegetarian).

---

## 3. Assumptions Made

1. **Static Emission Factors**: Emission coefficients are assumed to remain constant throughout the year. Regional grid differences (e.g., local electricity carbon intensity) are generalized using global and national averages.
2. **Weekly/Monthly Extrapolations**: Onboarding questionnaire responses represent consistent habits throughout the year (e.g., miles driven per week are multiplied by 52 to calculate annual impact).
3. **LocalStorage Availability**: The app operates with zero backend. We assume client-side `localStorage` is available in the user's browser to store profile settings, completion logs, and challenges.

---

## 4. Evaluation Focus Areas Achievements

### 🚀 Code Quality
- **Type Safety**: Built entirely in **TypeScript** with strict interface declarations (`src/types.ts`) for data structures.
- **Linting**: 100% clean ESLint report (`npm run lint` yields 0 errors, 0 warnings).
- **Component Pattern**: Focused, modular React components located in `src/components/` with state-based routing inside `src/App.tsx`.
- **Clean State Flow**: Lazy initializers are used inside `useState` to load from LocalStorage on mount, avoiding synchronous cascading renders in React's render phase.

### 🔒 Security
- **Content Security Policy (CSP)**: Strict security policy meta tag added to `index.html` preventing cross-site scripting (XSS) and injection attacks.
- **Local Storage Schema Validation**: Robust validation logic (`validateUserData` inside `src/utils/storage.ts`) checks the integrity of localStorage data on retrieval, safely recovering with default values in case of corrupted, malformed, or maliciously injected JSON.
- **Dependencies**: 0 vulnerabilities found (`npm audit` report is clean).

### ⚡ Efficiency
- **Cloud-free & Zero-backend**: Runs entirely client-side. No database connections, API calls, or server roundtrips required for calculations or recommendations.
- **Recharts Rendering**: Lightweight rendering of SVGs for responsive dashboard analytics.
- **Fast Production Builds**: Builds and bundles in less than 400ms using Vite + TypeScript compile pipeline.

### 🧪 Testing
- **Vitest Testing suite**: Built-in unit testing checking calculations, personalized recommendations, and LocalStorage CRUD operations.
- **Execution**: To run tests:
  ```bash
  npm run test
  ```
- **Results**: 12/12 unit tests pass successfully in less than 350ms.

### ♿ Accessibility
- **Label Association**: Every form field, range slider, and select input inside the onboarding flow is explicitly associated with its label using unique `id` and `htmlFor` configurations.
- **Focus Indicators**: Custom visible focus outlines (`:focus-visible` styles in `src/index.css`) allow keyboard-only users to navigate the app easily.
- **Screen Reader Summaries**: Visual charts (PieChart & BarChart) are accompanied by a screen-reader-only HTML data table (`.sr-only` class) summarizing the calculations and comparison benchmarks.
- **Aria attributes**: Screen elements include `aria-pressed`, `aria-selected`, `aria-hidden`, and `aria-live="polite"` tags to report dynamic state updates.
- **Emoji Wrapping**: Standard visual emojis are wrapped inside `<span role="img" aria-hidden="true">` elements to prevent screen readers from reading raw emoji names out loud.

---

## How to Run

### Install Dependencies
```bash
npm install
```

### Dev Server
```bash
npm run dev
```

### Production Build
```bash
npm run build
```

### Run Tests
```bash
npm run test
```
