---
layout: post.pug
title: PGP in ProtonMail and Gmail
category: tech
excerpt: Attempting to verify a PGP signed mail from ProtonMail sent to Gmail
---

I switched my personal email to [ProtonMail](https://protonmail.com) about a year ago. I've had a personal domain with email for a few years, and used to just use mailgun to forward all emails to gmail. This essentially meant that my personal domain email was less trusted than gmail. With the privacy/security landscape being what it is these days, I wanted my personal domain email to be _more_ trusted!

ProtonMail recently released support for sending/receiving PGP signed or encrypted emails from _non-protonmail users_, so I wanted to start sending all emails from ProtonMail signed!

It's fairly easy to enable sending PGP signed messages in ProtonMail, just navigate to `ProtonMail > Settings > Security > External PGP Settings (optional)`.

From there you can enable signing of external messages (pm-pm messages are always encrypted and signed).

<img src="https://static.mwild.me/images/pm-security-settings.jpg" style="width:400px"></a>

I didn't enable attaching the public key as my keys are all published at [keybase.io/tehmantra](https://keybase.io/tehmantra).

So, lets see what an email sent to Gmail looks like now:

<img src="https://static.mwild.me/images/pm-email-in-gmail.jpg" style="width:800px"></a>


Well that's pretty useless... the signature is attached, but gmail doesn't do anything useful with it.
I don't expect Google to change this any time soon, but I was curious if I could verify the signature manually.

We need to download the raw email from gmail. Click the 3 dots next to the reply button, then 'Show original', then 'Download original'.

Somewhere near the middle of this raw message you should see something like this:

```
Content-Type: multipart/signed; protocol="application/pgp-signature"; micalg=pgp-sha256; boundary="---------------------d0e366f37040fe065084b915ac972cd8";
```
The part of this message that can be verified is the HTML and text content between the first two 'boundaries'.

```
Content-Type: multipart/signed; protocol="application/pgp-signature"; micalg=pgp-sha256; boundary="---------------------d0e366f37040fe065084b915ac972cd8"; charset=UTF-8
X-Spam-Status: No, score=-1.2 required=7.0 tests=ALL_TRUSTED,DKIM_SIGNED, DKIM_VALID,DKIM_VALID_AU,DKIM_VALID_EF,HTML_MESSAGE autolearn=ham autolearn_force=no version=3.4.2
X-Spam-Checker-Version: SpamAssassin 3.4.2 (2018-09-13) on mail.protonmail.ch

-----------------------d0e366f37040fe065084b915ac972cd8                                                             <--- this one
Content-Type: multipart/mixed;boundary=---------------------7853428854a3942a2e3a3b5c656ba027

-----------------------7853428854a3942a2e3a3b5c656ba027
Content-Type: multipart/alternative;boundary=---------------------f17b73fc9f84a5ce5fcf4dc9c1a48bcb

-----------------------f17b73fc9f84a5ce5fcf4dc9c1a48bcb
Content-Transfer-Encoding: quoted-printable
Content-Type: text/plain;charset=utf-8

This is what an email looks like in Gmail!
-----------------------f17b73fc9f84a5ce5fcf4dc9c1a48bcb
Content-Type: multipart/related;boundary=---------------------8fdbae453b6f0f3cd5c1c0fe3f1bd6ed

-----------------------8fdbae453b6f0f3cd5c1c0fe3f1bd6ed
Content-Type: text/html;charset=utf-8
Content-Transfer-Encoding: base64

PGRpdj5UaGlzIGlzIHdoYXQgYW4gZW1haWwgbG9va3MgbGlrZSBpbiBHbWFpbCE8L2Rpdj48ZGl2
IGNsYXNzPSJwcm90b25tYWlsX3NpZ25hdHVyZV9ibG9jayBwcm90b25tYWlsX3NpZ25hdHVyZV9i
bG9jay1lbXB0eSI+PGRpdiBjbGFzcz0icHJvdG9ubWFpbF9zaWduYXR1cmVfYmxvY2stdXNlciBw
cm90b25tYWlsX3NpZ25hdHVyZV9ibG9jay1lbXB0eSI+PGJyPjwvZGl2PjxkaXYgY2xhc3M9InBy
b3Rvbm1haWxfc2lnbmF0dXJlX2Jsb2NrLXByb3RvbiBwcm90b25tYWlsX3NpZ25hdHVyZV9ibG9j
ay1lbXB0eSI+PGJyPjwvZGl2PjwvZGl2Pg==
-----------------------8fdbae453b6f0f3cd5c1c0fe3f1bd6ed--
-----------------------f17b73fc9f84a5ce5fcf4dc9c1a48bcb--
-----------------------7853428854a3942a2e3a3b5c656ba027--
-----------------------d0e366f37040fe065084b915ac972cd8                                                             <--- and this one
Content-Type: application/pgp-signature; name="signature.asc"
Content-Description: OpenPGP digital signature
Content-Disposition: attachment; filename="signature.asc"

-----BEGIN PGP SIGNATURE-----
Version: ProtonMail
Comment: https://protonmail.com

wsBcBAEBCAAGBQJcjZ3BAAoJEGDA50iqbTP2lcgH/RS1V7KOjQjmwSKUzR0F
4dOTFb828YCTONiT2c1m2dPKWH9+t6mBohtzwGAtz1fGd5xYiEtLKrVQwVm1
8pQoIs4358B6zEDM8Oun/WfrKD7eENpxVglwZDx5vtirjLzHk1Cze9WdFw6R
4lH3Oc0DosdtIPbs6KIHYj97jPuTEdsWvD6A6KMO6Rj82n0rZdgLu2Mok/WI
u0U3ZY7xk8X2Y+aJRkrMT0r7s8KVCTVMyDbVgRDLC8yQ1Le34X8ndxIypSwi
R6WPC/IdJl37KopA2+UOuUOR7uIb+uFhKA1llQ/r53eixw56Z/cRw/5lrhCL
/ZkukBxs4c/94JXDvaGIWF4=
=H0db
-----END PGP SIGNATURE-----


-----------------------d0e366f37040fe065084b915ac972cd8--
```

The 3rd boundary contains the signature attachment, which obviously can't be part of the signed content.
So copy everything **between** those two barriers into a text file.
Make sure to set the line ending mode to `CRLF`, if you're on mac, this will probably default to `LF`.

```
$ cat message.txt
Content-Type: multipart/mixed;boundary=---------------------7853428854a3942a2e3a3b5c656ba027

-----------------------7853428854a3942a2e3a3b5c656ba027
Content-Type: multipart/alternative;boundary=---------------------f17b73fc9f84a5ce5fcf4dc9c1a48bcb

-----------------------f17b73fc9f84a5ce5fcf4dc9c1a48bcb
Content-Transfer-Encoding: quoted-printable
Content-Type: text/plain;charset=utf-8

This is what an email looks like in Gmail!
-----------------------f17b73fc9f84a5ce5fcf4dc9c1a48bcb
Content-Type: multipart/related;boundary=---------------------8fdbae453b6f0f3cd5c1c0fe3f1bd6ed

-----------------------8fdbae453b6f0f3cd5c1c0fe3f1bd6ed
Content-Type: text/html;charset=utf-8
Content-Transfer-Encoding: base64

PGRpdj5UaGlzIGlzIHdoYXQgYW4gZW1haWwgbG9va3MgbGlrZSBpbiBHbWFpbCE8L2Rpdj48ZGl2
IGNsYXNzPSJwcm90b25tYWlsX3NpZ25hdHVyZV9ibG9jayBwcm90b25tYWlsX3NpZ25hdHVyZV9i
bG9jay1lbXB0eSI+PGRpdiBjbGFzcz0icHJvdG9ubWFpbF9zaWduYXR1cmVfYmxvY2stdXNlciBw
cm90b25tYWlsX3NpZ25hdHVyZV9ibG9jay1lbXB0eSI+PGJyPjwvZGl2PjxkaXYgY2xhc3M9InBy
b3Rvbm1haWxfc2lnbmF0dXJlX2Jsb2NrLXByb3RvbiBwcm90b25tYWlsX3NpZ25hdHVyZV9ibG9j
ay1lbXB0eSI+PGJyPjwvZGl2PjwvZGl2Pg==
-----------------------8fdbae453b6f0f3cd5c1c0fe3f1bd6ed--
-----------------------f17b73fc9f84a5ce5fcf4dc9c1a48bcb--
-----------------------7853428854a3942a2e3a3b5c656ba027--
```

Now use keybase to verify the message

```
$ keybase pgp verify -d signature.asc -i message.txt 
Signature verified. Signed by tehmantra 24 minutes ago (2019-03-17 14:07:13 +1300 NZDT).
PGP Fingerprint: 912045116b081b1a10f0c4e860c0e748aa6d33f6.
```

There you have it, not exactly intuitive or easy to use, but you can verify PGP signatures from messages sent to Gmail.
