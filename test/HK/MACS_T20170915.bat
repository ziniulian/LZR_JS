@echo off
:: �� ARP ��ʽ��ȡ�����������е��Ե�MAC��ַ��ARP���Ż����ֻ��ping���ĵ��ԣ��Ż��¼ARP��Ϣ��
echo %date% %time% > MACS.txt
set ip=192.169.0
for /l %%j in (2,1,254) do (echo %%j && ping %ip%.%%j -n 1 -w 100 | find "TTL" && arp -a %ip%.%%j | find ".%%j" | find /v "---" >> MACS.txt)
pause
