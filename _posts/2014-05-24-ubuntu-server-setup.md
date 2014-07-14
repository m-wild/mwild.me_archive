---
layout: post
title: Ubuntu Server setup
---

##Basic Ubuntu server setup

###1. Install Ubuntu Server
- Use mostly default options
- Make sure to install OpenSSH server
- Update and upgrade software
  <pre><code>sudo aptitude update
sudo aptitude upgrade
  </code></pre>

###2. SSH Configuration
How to set up keys from Windows with PuTTY

1. Generate key pair in PuTTYgen (on client) -- the passphrase you use here will replace password at login
2. Save both keys to a secure location (on the client)
3. Setup authroized keys on the server
    <pre><code>mkdir ~/.ssh
chmod 700 ~/.ssh
touch ~/.ssh/authorized_keys
chmod 600 ~/.ssh/authorized_keys
vi ~/.ssh/authorized_keys
</code></pre>
4. open the PUBLIC key on the client and copy it to the server (authorized_keys file) -- _The file should be formatted (exactly, with no CR or LF chars)_
    <pre><code>ssh-rsa the_key_string the_key_comment</code></pre>
5. add the private key to PuTTY (in PuTTY config)
    <pre><code>Connection > SSH > Auth > Private key file for...</code></pre>
6. Verify the server is accepting the key by logging in with PuTTY
7. disable password authentication (on ssh server)
	<pre><code>sudo vi /etc/ssh/sshd_config</code></pre>
locate the line `#PasswordAuthentication yes` <br>
and replace it with	`PasswordAuthentication no` <br>
    <pre><code>sudo restart ssh</code></pre>
8. Verify that you CANT log in WITHOUT the key.
