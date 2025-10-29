from datetime import datetime
import os
from flask import Flask, render_template, request, redirect, url_for, flash

app = Flask(__name__)
app.config["SECRET_KEY"] = os.environ.get("SECRET_KEY", "change-this-secret-key")


@app.context_processor
def inject_globals():
  return {"current_year": datetime.utcnow().year}


@app.route("/")
def home():
  return render_template("index.html")


@app.route("/about")
def about():
  return render_template("about.html")


@app.route("/services")
def services():
  return render_template("services.html")


@app.route("/portfolio")
def portfolio():
  return render_template("portfolio.html")


@app.route("/why-us")
def why_us():
  return render_template("why-us.html")


@app.route("/testimonials")
def testimonials():
  return render_template("testimonials.html")


@app.route("/faq")
def faq():
  return render_template("faq.html")


@app.route("/booking", methods=["GET", "POST"])
def booking():
  if request.method == "POST":
    form_data = {
      "name": request.form.get("name", "").strip(),
      "email": request.form.get("email", "").strip(),
      "phone": request.form.get("phone", "").strip(),
      "date": request.form.get("date", "").strip(),
      "time": request.form.get("time", "").strip(),
      "budget": request.form.get("budget", "").strip(),
      "message": request.form.get("message", "").strip(),
    }

    missing_fields = [key for key, value in form_data.items() if not value]
    if missing_fields:
      flash("Please fill in all fields before submitting your booking request.", "danger")
      return render_template("booking.html"), 400

    app.logger.info("Booking request received: %s", form_data)
    flash("Thanks for booking a call! We will confirm the slot via email within 24 hours.", "success")
    return redirect(url_for("booking"))

  return render_template("booking.html")


@app.route("/contact", methods=["GET", "POST"])
def contact():
  if request.method == "POST":
    form_data = {
      "name": request.form.get("name", "").strip(),
      "email": request.form.get("email", "").strip(),
      "message": request.form.get("message", "").strip(),
    }

    if not all(form_data.values()):
      flash("Please share your name, email, and message so we can respond.", "danger")
      return render_template("contact.html"), 400

    app.logger.info("Contact message received: %s", form_data)
    flash("Thanks for reaching out! Expect a response from Chandan within 24 hours.", "success")
    return redirect(url_for("contact"))

  return render_template("contact.html")


@app.errorhandler(404)
def page_not_found(error):
  return render_template("404.html"), 404


@app.errorhandler(500)
def server_error(error):
  return render_template("500.html"), 500


if __name__ == "__main__":
  port = int(os.environ.get("PORT", 5000))
  debug = os.environ.get("FLASK_DEBUG", "0") == "1"
  app.run(host="0.0.0.0", port=port, debug=debug)
