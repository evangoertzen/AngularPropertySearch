# Use the official Python image
FROM python:3.10

# Set the working directory
WORKDIR /app

# Copy requirements and install dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy the API code
COPY . .

# Expose the port Cloud Run will use
EXPOSE 8080

# Start the Uvicorn server
CMD ["uvicorn", "APIhost:app", "--host", "0.0.0.0", "--port", "8080"]
