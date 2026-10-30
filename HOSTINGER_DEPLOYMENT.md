# Hostinger Deployment Guide | دليل رفع المنصة على هوستنجر
### Dr. Amine Nokta Appointment System (إقليم مديونة)

This application is ready to deploy on **Hostinger**. Hostinger supports Node.js on both **Shared/Cloud Hosting (hPanel)** and **Hostinger VPS**. Follow the section that matches your plan:

---

## Plan A: Hostinger Shared / Cloud Hosting (hPanel)

If your Hostinger plan includes the **Node.js** feature in hPanel:

### Step 1: Prepare the Files
1. On your computer, make sure the project is built:
   ```bash
   npm run build
   ```
   *(This generates the production `dist/` folder).*
2. Zip the project folder **EXCEPT** `node_modules` (do not include `node_modules`, it will be installed on the server).
   * Files to include in zip:
     - `dist/`
     - `server/`
     - `public/`
     - `index.js`
     - `package.json`

### Step 2: Upload to Hostinger
1. Log in to **Hostinger hPanel**.
2. Go to **Websites** $\rightarrow$ Click **Manage** on your domain.
3. Open **File Manager** (under Files).
4. Navigate to `public_html/`.
5. Upload your zip file and **Extract** it directly into `public_html/`.

### Step 3: Configure Node.js in hPanel
1. In hPanel, search for **Node.js** in the left sidebar.
2. Click **Create Application** (or Edit existing):
   * **Node.js Version:** Select **20.x** or **22.x** (recommended).
   * **Application Mode:** **Production**.
   * **Application Root:** `public_html` (or `/home/uXXXXX/domains/yourdomain.com/public_html`).
   * **Application Startup File:** `index.js`
3. Click **Save** / **Create**.

### Step 4: Install Dependencies & Run
1. In the Node.js management screen, click **Run `npm install`** (or open the terminal in hPanel and run `npm install --omit=dev`).
2. Click **Start Application** (or **Restart**).
3. Visit your domain name (e.g. `https://yourdomain.com`) — your platform is live!

---

## Plan B: Hostinger VPS (Ubuntu / Debian)

If you have a **Hostinger VPS**, you have full control using Node.js, PM2, and Nginx.

### Step 1: Connect via SSH
```bash
ssh root@YOUR_SERVER_IP
```

### Step 2: Install Node.js 22 & PM2
```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Node.js 22
curl -fsSL https://deb.nodesource.com/setup_22.x | sudo -E bash -
sudo apt install -y nodejs nginx git

# Install PM2 globally to keep the server running 24/7
sudo npm install -g pm2
```

### Step 3: Upload or Clone the Project
```bash
# Create directory
mkdir -p /var/www/nokta-appointement
cd /var/www/nokta-appointement

# Upload your files here via SCP or Git, then install:
npm install
npm run build
```

### Step 4: Start the Service with PM2
```bash
# Start the app
pm2 start index.js --name "nokta-appointement"

# Enable auto-start on server reboot
pm2 startup
pm2 save
```

### Step 5: Configure Nginx as Reverse Proxy
Edit the Nginx configuration:
```bash
sudo nano /etc/nginx/sites-available/nokta
```

Paste this configuration (replace `yourdomain.ma` with your actual domain):
```nginx
server {
    listen 80;
    server_name yourdomain.ma www.yourdomain.ma;

    location / {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }
}
```

Enable the site and reload Nginx:
```bash
sudo ln -s /etc/nginx/sites-available/nokta /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

### Step 6: Free SSL Certificate (HTTPS)
```bash
sudo apt install -y certbot python3-certbot-nginx
sudo certbot --nginx -d yourdomain.ma -d www.yourdomain.ma
```

---

## Administrative Access on Hostinger

* **Admin Portal URL:** `https://yourdomain.com` $\rightarrow$ Click **🔒 ديوان النائب** in the header.
* **Master PIN:** `nokta2026`
* **Appointments Database:** Stored safely in `server/data/appointments.json` (easy to backup anytime from Hostinger File Manager).

