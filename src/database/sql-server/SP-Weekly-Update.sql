USE [rotating]
GO
/****** Object:  StoredProcedure [dbo].[weekly_status]    Script Date: 05/11/2020 21:11:55 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

ALTER PROCEDURE [dbo].[weekly_status] AS 

select 
	week_one,
	status
into #temp 
from dbo.equipment_details

select
b.week_one,
a.week_two,
b.status
into #tempA
from equipment_details a inner join #temp b on b.week_one = a.week_two

select 
c.week_one,
a.week_three,
c.status
into #tempB
from equipment_details a inner join #temp c on c.week_one = a.week_three

select 
d.week_one,
a.week_four,
d.status
into #tempD
from equipment_details a inner join #temp d on d.week_one = a.week_four

select 
	a.week_one, 
	ISNULL(a.status, 0)+ISNULL(b.status,0)+ISNULL(c.status,0)+ISNULL(d.status,0) As total
into #lasttemp
from #temp a 
left join #tempA b on a.week_one = b.week_one
left join #tempB c on a.week_one = c.week_one
left join #tempD d on a.week_one = d.week_one

TRUNCATE TABLE weekly_update

INSERT INTO weekly_update (week_one, total)

select week_one, total 

from #lasttemp