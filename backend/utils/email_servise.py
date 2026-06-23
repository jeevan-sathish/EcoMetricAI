import resend
import os
from dotenv import load_dotenv
from datetime import datetime

load_dotenv()

resend.api_key = os.getenv("RESEND_API_KEY")

def send_cron_email(inserted_count: int, inserted_cars: list):
    if inserted_count == 0:
        subject = "EcoMetricAI Cron — No New Data"
        body = f"""
        <h2>Cron Job Completed</h2>
        <p>Ran at: {datetime.now().strftime("%Y-%m-%d %H:%M:%S")}</p>
        <p>No new vehicles were inserted. All fetched data already exists in the database.</p>
        """
    else:
        rows_html = "".join([
            f"<tr><td>{c.get('brand')}</td><td>{c.get('model')}</td><td>{c.get('co2emission')}</td><td>{c.get('fueltype')}</td></tr>"
            for c in inserted_cars
        ])

        subject = f"EcoMetricAI Cron — {inserted_count} New Vehicle(s) Added"
        body = f"""
        <h2>Cron Job Completed</h2>
        <p>Ran at: {datetime.now().strftime("%Y-%m-%d %H:%M:%S")}</p>
        <p><strong>{inserted_count} new vehicle(s)</strong> were inserted into the database.</p>
        <table border="1" cellpadding="8" cellspacing="0">
            <thead>
                <tr>
                    <th>Brand</th>
                    <th>Model</th>
                    <th>CO2 Emission</th>
                    <th>Fuel Type</th>
                </tr>
            </thead>
            <tbody>
                {rows_html}
            </tbody>
        </table>
        """

    try:
        resend.Emails.send({
            "from": "EcoMetricAI <onboarding@resend.dev>",
            "to": os.getenv("CORN_NOTIFY_EMAIL"),
            "subject": subject,
            "html": body,
        })
        print("Email sent successfully")
    except Exception as e:
        print("Email send failed:", str(e))