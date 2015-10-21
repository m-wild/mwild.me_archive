---
layout: post
title: ssh config
category: tech
excerpt: basic ubuntu server ssh setup
---

##Basic Ubuntu server ssh setup

How to set up keys from Windows with PuTTY

1. Generate key pair in PuTTYgen (on client) -- the passphrase you use here will replace password at login
2. Save both keys to a secure location (on the client)
3. Setup authroized keys on the server

    ```bash
mkdir ~/.ssh
chmod 700 ~/.ssh
touch ~/.ssh/authorized_keys
chmod 600 ~/.ssh/authorized_keys
vi ~/.ssh/authorized_keys
    ```
4. open the PUBLIC key on the client and copy it to the server (authorized_keys file) -- _The file should be formatted (exactly, with no CR or LF chars)_

    ```
ssh-rsa the_key_string the_key_comment
    ```
5. add the private key to PuTTY (in PuTTY config)

    ```
Connection > SSH > Auth > Private key file for...
    ```
6. Verify the server is accepting the key by logging in with PuTTY
7. disable password authentication (on ssh server)

	```bash
sudo vi /etc/ssh/sshd_config
    ```
locate the line `#PasswordAuthentication yes` <br>
and replace it with	`PasswordAuthentication no` <br>

    ```bash
sudo restart ssh
    ```
8. Verify that you _CAN'T_ log in WITHOUT the key.
