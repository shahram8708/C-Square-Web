# C-Square-Web

C-Square-Web is a Python Flask web application that serves as the front-end website for the C-Square business services platform. It provides informational pages including home, about, services, portfolio, FAQ, testimonials, and contact/booking forms.

## Overview

This project is a server-rendered website built with **Flask** and standard web technologies. The application renders HTML templates for multiple public pages and handles simple form submissions for contact and booking requests with user feedback via Flash messages.

## Features

This web application implements:

* Multiple static content pages routed via Flask (Home, About, Services, Portfolio, FAQ, Testimonials, Why Us)
* Booking form handling with server-side validation
* Contact form handling with server-side validation
* Flash messaging for user feedback
* Custom error pages for HTTP 404 and 500
* Injected current year via context processor for templates

## Tech Stack

The project uses the following technologies:

* **Python**
* **Flask** web framework
* **Jinja2** templating
* **Gunicorn** (for production WSGI deployment)
* Standard HTML/CSS/JavaScript in templates

## Repository Structure

```
C-Square-Web/
├── static/                  # Static assets (CSS, JS, images)
├── templates/               # Jinja2 HTML templates
├── app.py                   # Flask application entry point
└── requirements.txt         # Python dependencies
```

* `static/` contains all front-end static files used by the templates.
* `templates/` holds all HTML template files rendered by Flask.
* `app.py` defines the application routes, form handling logic, and error handlers.
* `requirements.txt` lists all Python libraries required to run the app.

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/shahram8708/C-Square-Web.git
   cd C-Square-Web
   ```

2. Create and activate a Python virtual environment:

   ```bash
   python3 -m venv venv
   source venv/bin/activate
   ```

3. Install dependencies:

   ```bash
   pip install -r requirements.txt
   ```

## Configuration

The application reads the following environment variables:

* `SECRET_KEY` – Flask secret key for session and flash messages (defaults to `"change-this-secret-key"` if not set)
* `PORT` – Port number the application will run on (default `5000`)
* `FLASK_DEBUG` – Set to `"1"` to enable debug mode

Example environment setup:

```bash
export SECRET_KEY="your-secure-secret"
export FLASK_DEBUG=1
export PORT=5000
```

## Usage

Run the application locally with:

```bash
python app.py
```

Then open your browser at `http://localhost:5000` to view the site.

### Form Handling

* **Booking** (`/booking`): Handles POST requests for new booking requests. Requires all fields to be filled.
* **Contact** (`/contact`): Handles POST requests for user messages. Requires name, email, and message.

Both forms give success/failure feedback using Flask flash messages.

## Scripts

This project does not include additional build or utility scripts. Use the standard Python command to run the app.

## Error Handling

* Custom 404 and 500 error pages are defined via `@app.errorhandler`.
* Template rendering is provided for all standard HTTP error responses.

## Environment Variables

| Variable      | Description                               | Default                    |
| ------------- | ----------------------------------------- | -------------------------- |
| `SECRET_KEY`  | Secret key for sessions and security      | `"change-this-secret-key"` |
| `PORT`        | Port to run the server                    | `5000`                     |
| `FLASK_DEBUG` | Enable Flask debug mode (`"1"` = enabled) | Disabled                   |

## Dependencies

All Python dependencies are listed in `requirements.txt`:

```
Flask
Jinja2
Werkzeug
itsdangerous
MarkupSafe
click
gunicorn
python-dotenv
```

## License

This repository does not contain a license file, so no explicit open-source license is indicated.

## Notes

* This is a simple informational site backed by Flask with minimal backend logic.
* The repository contains no database integration or admin interface.
* Static assets and templates drive most of the UI content.
