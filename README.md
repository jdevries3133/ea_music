# Broad Design Questions

## How do students authenticate?

Students may look up their name and just authenticate by name. As long as we
don't have a fingerprint for that device, or the fingerprint matches the
fingerprint that a student previously used, they will be authenticated.

If there is a fingerprint mismatch, like if a user tries logging in from a
different device, or a student tries to impersonate a peer, an admin password
must be entered, which only I know.

[fingerprintjs](https://github.com/fingerprintjs/fingerprintjs)
will provide the fingerprinting service.

## Which views are required for tomorrow?

- [x] login
- [x] poster vote
  - [x] homeroom and school-wide options
  - [x] when generating the random choices, skip things the user has seen
  - [ ] transition UI for voting, and UI to show that the vote has been
        recorded

## Security: How will student privacy be protected?

Privacy requirements:

- student names must not be public
- student posters must not be public (they contain names)

Privacy implementation steps:

### Super-Simple Storage for Private Stuff

1. Student names will be the name of the poster file, separated by commas.
   Posters will be deep in sub-folders; first by homeroom, then by grade level
2. Throw this stuff in an S3 bucket
3. Give the app an API key to access and serve this stuff

### IP Protection

First of all, this will be implemented after day 1, because I don't even know
what the school's IP address is right now.

Visitors not visiting from the school IP will need to enter an admin password
to proceed. I have seen at least one student using a VPN, so I want to be
able to override and let those kids in.

Thereafter, we can bypass the IP filter if the visitor can present a familiar
browser id. Not for knox secure whatsoever, but at least there is some layer
of defense against creepers. I don't see how a random person could reasonably
acquire the browser id of a student. Obviously, that's not a secret value,
but it's also not public and I doubt it could be easily brute-forced. The
only thing to think about is the fact that an attacker who can execute a script
on a student's computer would be able to get their browser ID and therefore
access the service, but I'll evaluate that as a reasonable risk.

If we really need to lock things down, OAuth would be the most reasonable
thing to do anyway. No point getting too bogged down with this IP ban idea.

### Student Data

For authentication and basic app features we need to know information about
each student:

- name
- homeroom code (which also stores the grade level)

This can be passed as a big JSON environment variable, like what I do for
the ea_reset app.

## How will initial student data be loaded into the DB?

Student grade levels, homerooms, and names will be encoded into the file
system, so we don't need to keep that information in the DB, and the app will
dynamically respond to changes in the S3 bucket.

## How will posters be downloaded and loaded into the DB?

See above.

## What is the data model?

We can just have a vote object. Everything else we need can be aggregated
from that.

```
Vote {
  id          Int
  timestamp   Date
  voter_name  String
  winner      Poster (path to poster as a String)
  loser       Poster (path to poseter as a String)
}
```
