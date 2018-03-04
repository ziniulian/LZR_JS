@echo off
:: 用 ARP 方式获取局域网内所有电脑的MAC地址，ARP是张缓存表，只有ping过的电脑，才会记录ARP信息。
echo %date% %time% > MACS.txt
set ip=192.169.0
for /l %%j in (2,1,254) do (echo %%j && ping %ip%.%%j -n 1 -w 100 | find "TTL" && arp -a %ip%.%%j | find ".%%j" | find /v "---" >> MACS.txt)
pause
