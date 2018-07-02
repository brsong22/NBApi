from lxml import etree as et
from lxml import html
import urllib.request
from datetime import datetime
import configparser

cfg = configparser.ConfigParser()
cfg.read("draft_flask_cfg.ini")
nba_url = cfg.get("Base", "Url")
cbb_url = cfg.get("Base", "CbbUrl")

prev_year = datetime.today().year-1

prev_draft_urls = []
for i in range(5):
	prev_draft_urls.append(nba_url + cfg.get("Draft", "DraftPath") + cfg.get("Draft", "PastDraftUrlPrefix") + str(prev_year-i) + cfg.get("Base", "FileExt"))


def get_draft_data():
	drafts = []
	parser = et.HTMLParser()

	for year_i, draft_url in enumerate(prev_draft_urls):
		draft = {'year': prev_year-year_i}
		draft_order = []

		with urllib.request.urlopen(draft_url) as draft_html:
			draft_tree = et.parse(draft_html, parser)
		for num in range(int(cfg.get("Draft", "NumPicks"))):
			#get team info
			pick_num = num+1
			team_abbr = draft_tree.xpath('//*[@id="stats"]/tbody/tr[' + str(pick_num) + ']/td[2]/a/text()')[0]
			team_abbr = 'NJN' if team_abbr == 'BRK' else team_abbr
			team_abbr = 'NOH' if team_abbr == 'NOP' else team_abbr
			team_abbr = 'CHA' if team_abbr == 'CHO' else team_abbr #typo on the webpage?
			team_abbr = 'CHA' if team_abbr == 'CHH' else team_abbr #charlotte hornets team re-name
			team_name = draft_tree.xpath('//*[@id="stats"]/tbody/tr[' + str(pick_num) + ']/td[2]/a/@title')[0]
			
			#team stats rankings
			team_link = nba_url + cfg.get("Teams", "TeamPath") + "/" + team_abbr + cfg.get("Teams", "TeamStatRanksPage")
			with urllib.request.urlopen(team_link) as stats_html:
				team_stats = et.parse(stats_html, parser)
			rank_3pa = team_stats.xpath('//*[@id="stats"]/tbody/tr[' + str(year_i + 1) + ']/td[17]//text()')[0]
			rank_3pp = team_stats.xpath('//*[@id="stats"]/tbody/tr[' + str(year_i + 1) + ']/td[18]//text()')[0]
			rank_2pa = team_stats.xpath('//*[@id="stats"]/tbody/tr[' + str(year_i + 1) + ']/td[20]//text()')[0]
			rank_2pp = team_stats.xpath('//*[@id="stats"]/tbody/tr[' + str(year_i + 1) + ']/td[21]//text()')[0]
			rank_fta = team_stats.xpath('//*[@id="stats"]/tbody/tr[' + str(year_i + 1) + ']/td[23]//text()')[0]
			rank_ftp = team_stats.xpath('//*[@id="stats"]/tbody/tr[' + str(year_i + 1) + ']/td[24]//text()')[0]
			rank_orb = team_stats.xpath('//*[@id="stats"]/tbody/tr[' + str(year_i + 1) + ']/td[25]//text()')[0]
			rank_drb = team_stats.xpath('//*[@id="stats"]/tbody/tr[' + str(year_i + 1) + ']/td[26]//text()')[0]
			rank_ast = team_stats.xpath('//*[@id="stats"]/tbody/tr[' + str(year_i + 1) + ']/td[28]//text()')[0]
			rank_stl = team_stats.xpath('//*[@id="stats"]/tbody/tr[' + str(year_i + 1) + ']/td[29]//text()')[0]
			rank_blk = team_stats.xpath('//*[@id="stats"]/tbody/tr[' + str(year_i + 1) + ']/td[30]//text()')[0]
			rank_pts = team_stats.xpath('//*[@id="stats"]/tbody/tr[' + str(year_i + 1) + ']/td[33]//text()')[0]
			team_stat_ranks = {'3pa':rank_3pa,
							   '3pp':rank_3pp,
							   '2pa':rank_2pa,
							   '2pp':rank_2pp,
							   'fta':rank_fta,
							   'ftp':rank_ftp,
							   'orb':rank_orb,
							   'drb':rank_drb,
							   'ast':rank_ast,
							   'stl':rank_stl,
							   'blk':rank_blk,
							   'pts':rank_pts}

			team_total_stats_url = nba_url + cfg.get("Teams", "TeamPath") + "/" + team_abbr + cfg.get("Teams", "TeamStatsPage")
			with urllib.request.urlopen(team_total_stats_url) as totals_html:
				team_totals = et.parse(totals_html, parser)
			total_3pa = team_totals.xpath('//*[@id="stats"]/tbody/tr[' + str(year_i + 1) + ']/td[17]//text()')[0]
			total_3pp = team_totals.xpath('//*[@id="stats"]/tbody/tr[' + str(year_i + 1) + ']/td[18]//text()')[0]
			total_2pa = team_totals.xpath('//*[@id="stats"]/tbody/tr[' + str(year_i + 1) + ']/td[20]//text()')[0]
			total_2pp = team_totals.xpath('//*[@id="stats"]/tbody/tr[' + str(year_i + 1) + ']/td[21]//text()')[0]
			total_fta = team_totals.xpath('//*[@id="stats"]/tbody/tr[' + str(year_i + 1) + ']/td[23]//text()')[0]
			total_ftp = team_totals.xpath('//*[@id="stats"]/tbody/tr[' + str(year_i + 1) + ']/td[24]//text()')[0]
			total_orb = team_totals.xpath('//*[@id="stats"]/tbody/tr[' + str(year_i + 1) + ']/td[25]//text()')[0]
			total_drb = team_totals.xpath('//*[@id="stats"]/tbody/tr[' + str(year_i + 1) + ']/td[26]//text()')[0]
			total_ast = team_totals.xpath('//*[@id="stats"]/tbody/tr[' + str(year_i + 1) + ']/td[28]//text()')[0]
			total_stl = team_totals.xpath('//*[@id="stats"]/tbody/tr[' + str(year_i + 1) + ']/td[29]//text()')[0]
			total_blk = team_totals.xpath('//*[@id="stats"]/tbody/tr[' + str(year_i + 1) + ']/td[30]//text()')[0]
			total_pts = team_totals.xpath('//*[@id="stats"]/tbody/tr[' + str(year_i + 1) + ']/td[33]//text()')[0]
			team_stat_totals = {'3pa': total_3pa,
								'3pp': total_3pp,
								'2pa': total_2pa,
								'2pp': total_2pp,
								'fta': total_fta,
								'ftp': total_ftp,
								'orb': total_orb,
								'drb': total_drb,
								'ast': total_ast,
								'stl': total_stl,
								'blk': total_blk,
								'pts': total_pts}
			player_name = draft_tree.xpath('//*[@id="stats"]/tbody/tr[' + str(pick_num) + ']/td[3]/a/text()')[0]
			
			team_info = {'name': team_name,
						 'abbr': team_abbr,
						 'team_ranks': team_stat_ranks,
						 'team_stats': team_stat_totals,
						 'player': player_name}
			draft_order.append(team_info)
		draft['board'] = draft_order
		drafts.append(draft)
	return drafts