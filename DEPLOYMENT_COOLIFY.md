# Deployment Guide for Coolify

## Prerequisites

- Coolify server running
- PostgreSQL database created in Coolify
- Domain name configured (optional)

## Option 1: Deploy with Coolify's PostgreSQL

### 1. Create PostgreSQL Database in Coolify

1. Go to your Coolify dashboard
2. Create a new **PostgreSQL** service
3. Note down the connection details:
   - Host
   - Port
   - Database name
   - Username
   - Password

### 2. Deploy the Application

1. **Create New Resource** in Coolify
2. **Choose Source**: Git Repository
3. **Repository URL**: Your Git repository URL
4. **Build Pack**: Nixpacks or Dockerfile
5. **Port**: 3000

### 3. Configure Environment Variables

Add these environment variables in Coolify:

```bash
# Database (from your Coolify PostgreSQL service)
POSTGRES_URL=postgresql://username:password@postgres-host:5432/dbname

# Admin Credentials (CHANGE THESE!)
ADMIN_USERNAME=admin
ADMIN_PASSWORD=YOUR_SECURE_PASSWORD_HERE
SESSION_SECRET=GENERATE_RANDOM_32_CHAR_STRING

# Email Configuration
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-gmail-app-password
CONTACT_EMAIL=info@dbrightservices.com

# Node Environment
NODE_ENV=production
```

### 4. Deploy

1. Click **Deploy** in Coolify
2. Wait for build to complete
3. Application will be available at your configured domain

## Option 2: Deploy with Docker Compose

### 1. Prepare Environment File

Create `.env` file with your settings:

```bash
# Copy from .env.example
cp .env.example .env

# Edit the file
nano .env
```

Update these values:
```bash
DB_PASSWORD=your_secure_db_password
ADMIN_USERNAME=your_admin_username
ADMIN_PASSWORD=your_secure_admin_password
SESSION_SECRET=$(openssl rand -base64 32)
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-gmail-app-password
```

### 2. Deploy with Docker Compose

```bash
# Start all services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

The application will be available at `http://localhost:3000`

## Option 3: Manual Deployment

### 1. Prepare Server

```bash
# Install Node.js 20+
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install PostgreSQL client
sudo apt-get install -y postgresql-client
```

### 2. Clone and Build

```bash
# Clone repository
git clone <your-repo-url>
cd DBright-Services

# Install dependencies
npm ci

# Build application
npm run build
```

### 3. Configure Environment

```bash
# Create .env file
cp .env.example .env
nano .env
```

### 4. Start Application

```bash
# Using PM2 (recommended)
npm install -g pm2
pm2 start npm --name "dbright" -- start
pm2 save
pm2 startup

# Or using systemd
sudo nano /etc/systemd/system/dbright.service
```

**Systemd service file:**
```ini
[Unit]
Description=D.BRIGHT Services
After=network.target postgresql.service

[Service]
Type=simple
User=www-data
WorkingDirectory=/path/to/app
EnvironmentFile=/path/to/app/.env
ExecStart=/usr/bin/npm start
Restart=always
RestartSec=10

[Install]
WantedBy=multi-user.target
```

```bash
# Enable and start service
sudo systemctl enable dbright
sudo systemctl start dbright
sudo systemctl status dbright
```

## Database Setup

The application will automatically create tables on first run. You can verify:

```bash
# Connect to PostgreSQL
psql $POSTGRES_URL

# List tables
\dt

# You should see:
# - contact_messages
# - page_analytics
```

## Post-Deployment

### 1. Verify Application

- Visit: `http://your-domain.com`
- Check homepage loads correctly
- Test contact form
- Visit analytics page (will be empty initially)

### 2. Access Admin Dashboard

- URL: `http://your-domain.com/admin`
- Username: Your `ADMIN_USERNAME`
- Password: Your `ADMIN_PASSWORD`

### 3. Test Analytics

1. Visit your site from different devices
2. Go to Admin → Analytics tab
3. You should see visitor data

## Nginx Configuration (Optional)

If you want to add SSL and reverse proxy:

```nginx
server {
    listen 80;
    server_name your-domain.com;
    
    # Redirect to HTTPS
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name your-domain.com;
    
    # SSL certificates (use certbot for free SSL)
    ssl_certificate /etc/letsencrypt/live/your-domain.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/your-domain.com/privkey.pem;
    
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

## Troubleshooting

### Application won't start
```bash
# Check logs
docker-compose logs app
# or
pm2 logs dbright
```

### Database connection errors
```bash
# Test database connection
psql $POSTGRES_URL

# Check if database exists
psql -h host -U user -l
```

### Analytics not tracking
1. Check browser console for errors
2. Check server logs: `docker-compose logs app | grep Track`
3. Verify database tables exist
4. Check POSTGRES_URL is correct

## Security Checklist

- [ ] Changed default ADMIN_PASSWORD
- [ ] Generated random SESSION_SECRET (32+ characters)
- [ ] Database password is strong
- [ ] SSL certificate installed
- [ ] Firewall configured
- [ ] Regular backups scheduled
- [ ] Environment variables not committed to Git

## Backup & Restore

### Backup Database

```bash
# Using docker-compose
docker-compose exec postgres pg_dump -U dbright_user dbright > backup.sql

# Manual
pg_dump $POSTGRES_URL > backup.sql
```

### Restore Database

```bash
# Using docker-compose
docker-compose exec -T postgres psql -U dbright_user dbright < backup.sql

# Manual
psql $POSTGRES_URL < backup.sql
```

## Support

For issues or questions:
- Check application logs
- Review Coolify documentation
- Check PostgreSQL connection
- Verify environment variables
