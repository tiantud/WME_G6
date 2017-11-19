<xsl:stylesheet version="1.0"
    xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
    <xsl:template match="/">
        <html>
            <body>
                <table id = "tbl">
				<thead id = "tbHead">  
                    <tr class = "headerRow">
                    	<th style="white-space:nowrap;">ID</th>
		                <th style="white-space:nowrap;">Country
							<i class="fa fa-angle-up" aria-hidden="true"></i>
							<i class="fa fa-angle-down" aria-hidden="true"></i>
						</th>
		                <th style="white-space:nowrap;">birth rate/1000
							<i class="fa fa-angle-up" aria-hidden="true"></i>
							<i class="fa fa-angle-down" aria-hidden="true"></i>
						</th>
		                <th style="white-space:nowrap;">cellphones/100
							<i class="fa fa-angle-up" aria-hidden="true"></i>
							<i class="fa fa-angle-down" aria-hidden="true"></i>
						</th>
		                <th style="white-space:nowrap;">children/woman
							<i class="fa fa-angle-up" aria-hidden="true"></i>
							<i class="fa fa-angle-down" aria-hidden="true"></i>
						</th>
		                <th style="white-space:nowrap;">electric usage
							<i class="fa fa-angle-up" aria-hidden="true"></i>
							<i class="fa fa-angle-down" aria-hidden="true"></i>
						</th>
		                <th style="white-space:nowrap;">internet usage
							<i class="fa fa-angle-up" aria-hidden="true"></i>
							<i class="fa fa-angle-down" aria-hidden="true"></i>
						</th>	
                    </tr>
				</thead> 
				<tbody id = "tbBody">
                    <xsl:for-each select="Contries/Contry">
                        <tr class = "bodyRow">
                            <td><xsl:value-of select="id" /></td>
                            <td><xsl:value-of select="name" /></td>
                            <td><xsl:value-of select="birth" /></td>
                            <td><xsl:value-of select="cell" /></td>
                            <td><xsl:value-of select="children" /></td>
                            <td><xsl:value-of select="electricity" /></td>
                            <td><xsl:value-of select="internet" /></td>
                        </tr>
                    </xsl:for-each>
				</tbody>
                </table>
            </body>
        </html>
    </xsl:template>
</xsl:stylesheet>