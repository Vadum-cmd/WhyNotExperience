# Node.js Package Installation: Local vs Global

## Understanding Node.js Package Management

Unlike Python's virtual environments, Node.js handles package isolation differently:

### Local Installation (Default - What We're Using)

When you run `npm install` in a project directory:
- ✅ Packages are installed **locally** in `node_modules/` folder within that project
- ✅ Each project has its own isolated dependencies
- ✅ No global system-wide installation
- ✅ Similar concept to Python's virtual environment, but automatic

**Example:**
```
BOAT/
├── frontend/
│   ├── node_modules/     ← Frontend packages here (local)
│   └── package.json
├── backend/
│   ├── node_modules/     ← Backend packages here (local)
│   └── package.json
└── node_modules/          ← Root packages here (if any, local)
```

### Global Installation (Not What We're Using)

Global installation happens with `npm install -g`:
- ❌ Installs packages system-wide
- ❌ Available to all projects
- ❌ We're NOT doing this
- ❌ Usually only for CLI tools (like `create-react-app`, `typescript`, etc.)

## How Our Setup Works

### Frontend Packages
```bash
cd frontend
npm install
```
**Result:** Packages installed in `frontend/node_modules/` (local to frontend project)

### Backend Packages
```bash
cd backend
npm install
```
**Result:** Packages installed in `backend/node_modules/` (local to backend project)

### Root Packages (if any)
```bash
npm install
```
**Result:** Packages installed in root `node_modules/` (local to root project)

## Verification

You can check where packages are installed:

```bash
# Check if packages are local (in project)
ls frontend/node_modules/
ls backend/node_modules/

# Check if a package is global (should return nothing for our packages)
npm list -g --depth=0 | grep react
```

## Key Points

1. ✅ **All our packages are installed LOCALLY** in each project's `node_modules/`
2. ✅ **No global installation** - each project is isolated
3. ✅ **Similar to Python venv** - but no activation needed
4. ✅ **Automatic isolation** - npm handles it by default

## Comparison with Python

| Python | Node.js |
|--------|---------|
| `python -m venv venv` | Automatic (no command needed) |
| `source venv/bin/activate` | Automatic (no activation needed) |
| `pip install package` | `npm install package` |
| Packages in `venv/lib/` | Packages in `node_modules/` |

## What This Means for You

- ✅ **Safe**: Installing packages won't affect other projects
- ✅ **Isolated**: Frontend and backend have separate dependencies
- ✅ **No conflicts**: Each project manages its own packages
- ✅ **No global pollution**: Your system stays clean

## Checking Installation Location

To verify packages are local:

```bash
# Frontend packages location
cd frontend
npm list --depth=0

# Backend packages location  
cd ../backend
npm list --depth=0
```

Both will show packages installed in their respective `node_modules/` directories.


