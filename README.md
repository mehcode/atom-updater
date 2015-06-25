# atom-updater

## Install

```
$ sudo npm install --global atom-updater
```

## Usage

```
$ atom-updater
```

## Auto Pilot (for systemd)

Create two files: one for the service, and another for a timer to run it.

##### [Service](https://github.com/mehcode/atom-updater/blob/master/systemd/atom-updater.service)

> /etc/systemd/system/atom-updater.service

You may need to adjust the path to atom-updater if you're using nvm or another method of global installing the package.

```
[Unit]
Description=Atom Updater

[Service]
Type=oneshot
ExecStart=/bin/sh -c "atom-updater"

[Install]
WantedBy=multi-user.target
```

##### [Timer](https://github.com/mehcode/atom-updater/blob/master/systemd/atom-updater.timer)

> /etc/systemd/system/atom-updater.timer

```
[Unit]
Description=Atom Updater

[Timer]
Persistent=true
OnUnitActiveSec=30m
OnBootSec=30m

[Install]
WantedBy=timers.target
```

Next, enable the timer service, sit back, and relax as your atom will forever auto-update.

```
$ sudo systemctl enable atom-updater.timer
```
