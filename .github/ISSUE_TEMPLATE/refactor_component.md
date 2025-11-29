---
name: "Refactor Component Into Model → Controller → View"
about: "Refactor an existing component into the MCV pattern"
title: "Refactor {component name} into MCV"
labels: ["refactor", "architecture"]
assignees: []
---

# Refactor `{component name}` into Model → Controller → View

## Description

Describe which component needs refactoring and why.  
Include current pain points, complexity issues, or clarity improvements expected from moving to the MCV architecture.

---

## Procedure / Steps

### 1️⃣ Extract the **Model**

- Identify pure data logic: calculations, transforms, validation.
- Move all functions that do **not** touch React, DOM, or JSX.


````js
// Model.js
export function calculateSomething(data) { ... }
export function validateInput(input) { ... }
````

### 2️⃣ Create the **Controller** (hook)

- Identify the **state** and **callbacks** that the component needs to manage.
- Move all **state**, **effects**, **memoization**, and **callbacks**
- Move event handlers that **manipulate state**
- Controller should call **Model functions**, not the other way around
- Controller should expose only what the View needs:
  state, callbacks, derived values, and nothing extra

### 3️⃣ Simplify the View

- Accept the controller as a prop.
- Keep it focused on JSX, layout, and purely visual interactions.
- Call controller handlers on events.

``` js
export default function MyView({ controller }) {
  const { data, handleChange } = controller;

  return (
    <input
      value={data}
      onChange={(e) => handleChange(e.target.value)}
    />
  );
}
````

### 4️⃣ Connect in the Parent Component

Example:

```js
import MyView from "./View";
import { useMyController } from "./Controller";

export default function MyComponent() {
  const controller = useMyController("initial value");

  return <MyView controller={controller} />;
}
```

### 5️⃣ Test as You Go

- Model → pure unit tests
- Controller → state transitions and handler behavior
- View → snapshot or interaction tests

## Folder Structure Recommendations

For each feature:
```
/FeatureName/
FeatureNameModel.js # pure data logic, rules, validation
FeatureNameController.js # hooks, state, event handlers
FeatureNameView.jsx # presentational UI

For shared UI components (modals, toasts, buttons):
/components/ui/
Modal/
ModalView.jsx
ModalController.js
Toast/
ToastView.jsx
ToastController.js
```
Benefits:
- Side-by-side editing: open Controller & View together
- Minimal jumping around
- Each feature self-contained
