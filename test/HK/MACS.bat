@echo off
setlocal enabledelayedexpansion
:: �� nbtstat ��ʽ��ȡ�����������е��Ե�MAC��ַ����������
::������� ping ���Լ�⵽��ֹ ping ��������������ʱ�����ĺܴ�
::�� ping ����������ִ�� nbtstat ���Խ�Լһ��ʱ�䡣

echo %date% %time% > MACS.txt
set ip=192.169.0
set rdo=0

for /l %%s in (4,1,254) do (
	echo %%s
	ping %ip%.%%s -n 1 -w 100 | find "TTL" > nul && (
		set rdo=0
		for /F "tokens=1,2,3,4*" %%i in ('nbtstat -a %ip%.%%s ^| findstr "<00> MAC" ^| findstr /v "��"') do (
			::echo %%i,%%j,%%k,%%l
			if not !rdo!==1 (
				if {%%k}=={=} (
					echo %ip%.%%s	%%l		!rdo! >> MACS.txt
					set rdo=1
				) else (
					set rdo=%%i
				)
			)
		)
	)
)
exit
