import { useState } from 'react';
import { Eye, Download, Share } from 'lucide-react';
import { Button } from '../../../ui/button';
import { Badge } from '../../../ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../../ui/table';
import { complianceReportsData } from '../constants/AdminComplianceConstants';

interface ComplianceReportsTableProps {
  language: 'en' | 'hi';
}

export function ComplianceReportsTable({ language }: ComplianceReportsTableProps) {
  const translations = {
    en: {
      reportName: 'Report Name',
      type: 'Type',
      generatedDate: 'Generated Date',
      status: 'Status',
      actions: 'Actions',
      view: 'View',
      download: 'Download',
      share: 'Share',
      ready: 'Ready',
      generating: 'Generating'
    },
    hi: {
      reportName: 'रिपोर्ट नाम',
      type: 'प्रकार',
      generatedDate: 'बनाने की तिथि',
      status: 'स्थिति',
      actions: 'कार्य',
      view: 'देखें',
      download: 'डाउनलोड',
      share: 'साझा करें',
      ready: 'तैयार',
      generating: 'बन रहा है'
    }
  };

  const t = translations[language];
  const { recentReports } = complianceReportsData;

  const getStatusBadge = (status: string) => {
    const isReady = status === 'Ready' || status === 'तैयार';
    return isReady 
      ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300'
      : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300';
  };

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>{t.reportName}</TableHead>
            <TableHead>{t.type}</TableHead>
            <TableHead>{t.generatedDate}</TableHead>
            <TableHead>{t.status}</TableHead>
            <TableHead className="text-right">{t.actions}</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {recentReports.map((report) => (
            <TableRow key={report.id}>
              <TableCell>
                <div>
                  <p className="font-medium text-foreground">
                    {language === 'hi' && report.name.includes('Monthly') ? 'मासिक अनुपालन रिपोर्ट' : report.name}
                  </p>
                  <p className="text-sm text-muted-foreground">{report.size}</p>
                </div>
              </TableCell>
              <TableCell>{report.type}</TableCell>
              <TableCell>{report.generatedDate}</TableCell>
              <TableCell>
                <Badge className={getStatusBadge(report.status)}>
                  {report.status === 'Ready' ? t.ready : t.generating}
                </Badge>
              </TableCell>
              <TableCell className="text-right">
                <div className="flex items-center justify-end space-x-2">
                  <Button variant="outline" size="sm">
                    <Eye className="w-4 h-4 mr-2" />
                    {t.view}
                  </Button>
                  {report.status === 'Ready' && (
                    <>
                      <Button variant="outline" size="sm">
                        <Download className="w-4 h-4 mr-2" />
                        {t.download}
                      </Button>
                      <Button variant="outline" size="sm">
                        <Share className="w-4 h-4 mr-2" />
                        {t.share}
                      </Button>
                    </>
                  )}
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}