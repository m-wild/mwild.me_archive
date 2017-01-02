---
layout: post
title: SSH Config
category: tech
---

#### How to set up keys from Windows with PuTTY

1. Generate key pair in PuTTYgen (on client) -- the passphrase you use here will replace password at login
2. Save both keys to a secure location (on the client)
3. Setup authroized keys on the server

   ```sh
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

   ```sh
   sudo vi /etc/ssh/sshd_config

   # locate the line
   PasswordAuthentication yes
   # and replace it with
   PasswordAuthentication no

   # remember to restart sshd
   sudo service ssh restart
   ```

8. Verify that you __CAN'T__ log in WITHOUT the key.



#### PuTTY oddities

Certain things may not work well with PuTTY by default (vi arrow keys, crtl-left/right between words, color output). Ensure the following options are set:

```
Terminal > Features > 
	[ ] Disable application cursor keys mode
	[x] Disable application keypad mode
	
Connection > Data > Terminal details
	Terminal-type string = putty-256color
```
