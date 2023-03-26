import React from 'react';
import NextLink from 'next/link';
import { Box, useColorMode } from '@chakra-ui/react';

interface LogoProps {
  height?: number;
  isLink?: boolean;
}

function Logo({ isLink, height }: LogoProps) {
  const { colorMode } = useColorMode();

  const containerStyling = {
    svg: { height: height ?? 50, width: 'auto' }
  };

  const LogoContainer = ({ children }: { children: React.ReactElement }) => {
    return isLink ? (
      <Box
        as={NextLink}
        href="/"
        aria-label="Link to the main page"
        css={containerStyling}
      >
        {children}
      </Box>
    ) : (
      <Box css={containerStyling}>{children}</Box>
    );
  };

  return (
    <LogoContainer>
      {colorMode === 'light' ? (
        <svg
          width="901"
          height="285"
          viewBox="0 0 901 285"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <title>Snipshot Logo</title>
          <path
            d="M319.708 205.2C314.108 205.2 308.908 204.48 304.108 203.04C299.388 201.52 295.348 199.36 291.988 196.56L298.588 187.56C302.748 190.2 306.468 192.04 309.748 193.08C313.028 194.12 316.308 194.64 319.588 194.64C323.988 194.64 327.468 193.92 330.028 192.48C332.668 191.04 333.988 189.16 333.988 186.84C333.988 185 333.268 183.56 331.828 182.52C330.388 181.48 328.508 180.72 326.188 180.24C323.868 179.76 321.268 179.32 318.388 178.92C315.588 178.52 312.748 178 309.868 177.36C307.068 176.72 304.468 175.84 302.068 174.72C299.748 173.52 297.868 171.88 296.428 169.8C294.988 167.64 294.268 164.84 294.268 161.4C294.268 157.56 295.308 154.28 297.388 151.56C299.468 148.76 302.388 146.6 306.148 145.08C309.988 143.56 314.348 142.8 319.228 142.8C323.868 142.8 328.348 143.44 332.668 144.72C337.068 145.92 341.268 147.88 345.268 150.6L338.668 159.48C335.468 157.24 332.188 155.68 328.828 154.8C325.548 153.84 322.228 153.36 318.868 153.36C315.028 153.36 311.988 154 309.748 155.28C307.508 156.48 306.388 158.16 306.388 160.32C306.388 162.16 307.108 163.56 308.548 164.52C309.988 165.48 311.908 166.2 314.308 166.68C316.708 167.16 319.348 167.6 322.228 168C325.108 168.4 327.948 168.92 330.748 169.56C333.628 170.2 336.268 171.12 338.668 172.32C341.068 173.52 342.988 175.2 344.428 177.36C345.868 179.52 346.588 182.36 346.588 185.88C346.588 189.64 345.388 193 342.988 195.96C340.668 198.84 337.468 201.12 333.388 202.8C329.308 204.4 324.748 205.2 319.708 205.2ZM365.861 204L365.861 143.88L379.421 143.88L379.421 152.88C384.061 146.24 390.221 142.92 397.901 142.92C402.061 142.92 405.701 143.84 408.821 145.68C411.941 147.44 414.381 149.96 416.141 153.24C417.981 156.44 418.901 160.16 418.901 164.4L418.901 204L405.221 204L405.221 168.24C405.221 163.84 404.021 160.36 401.621 157.8C399.221 155.16 396.021 153.84 392.021 153.84C389.461 153.84 387.101 154.4 384.941 155.52C382.781 156.64 380.941 158.28 379.421 160.44L379.421 204L365.861 204ZM463.734 132.12C461.014 132.12 458.694 131.16 456.774 129.24C454.934 127.32 454.014 125.04 454.014 122.4C454.014 119.76 454.934 117.52 456.774 115.68C458.694 113.76 461.014 112.8 463.734 112.8C466.374 112.8 468.614 113.76 470.454 115.68C472.374 117.52 473.334 119.76 473.334 122.4C473.334 125.04 472.374 127.32 470.454 129.24C468.614 131.16 466.374 132.12 463.734 132.12ZM479.094 205.2C471.814 205.2 466.294 203.48 462.534 200.04C458.774 196.6 456.894 191.52 456.894 184.8L456.894 154.68L435.294 154.68L435.294 143.88L470.454 143.88L470.454 183.36C470.454 186.96 471.294 189.56 472.974 191.16C474.734 192.76 477.374 193.56 480.894 193.56C482.894 193.56 484.854 193.36 486.774 192.96C488.694 192.56 490.814 191.92 493.134 191.04L493.134 202.44C491.294 203.16 489.094 203.8 486.534 204.36C483.974 204.92 481.494 205.2 479.094 205.2ZM509.167 229.08L509.167 143.88L522.367 143.88L522.367 151.2C524.527 148.56 527.047 146.56 529.927 145.2C532.807 143.76 536.007 143.04 539.527 143.04C544.567 143.04 549.127 144.44 553.207 147.24C557.367 149.96 560.647 153.64 563.047 158.28C565.527 162.92 566.767 168.16 566.767 174C566.767 179.76 565.527 185 563.047 189.72C560.567 194.36 557.247 198.04 553.087 200.76C549.007 203.48 544.407 204.84 539.287 204.84C536.007 204.84 532.967 204.24 530.167 203.04C527.367 201.76 524.887 199.96 522.727 197.64L522.727 229.08L509.167 229.08ZM536.287 193.8C539.647 193.8 542.607 192.96 545.167 191.28C547.727 189.6 549.727 187.28 551.167 184.32C552.607 181.28 553.327 177.84 553.327 174C553.327 170.16 552.607 166.76 551.167 163.8C549.727 160.84 547.727 158.52 545.167 156.84C542.607 155.08 539.647 154.2 536.287 154.2C533.567 154.2 531.047 154.76 528.727 155.88C526.407 156.92 524.407 158.44 522.727 160.44L522.727 187.56C524.407 189.56 526.407 191.12 528.727 192.24C531.127 193.28 533.647 193.8 536.287 193.8ZM607.52 205.2C601.92 205.2 596.72 204.48 591.92 203.04C587.2 201.52 583.16 199.36 579.8 196.56L586.4 187.56C590.56 190.2 594.28 192.04 597.56 193.08C600.84 194.12 604.12 194.64 607.4 194.64C611.8 194.64 615.28 193.92 617.84 192.48C620.48 191.04 621.8 189.16 621.8 186.84C621.8 185 621.08 183.56 619.64 182.52C618.2 181.48 616.32 180.72 614 180.24C611.68 179.76 609.08 179.32 606.2 178.92C603.4 178.52 600.56 178 597.68 177.36C594.88 176.72 592.28 175.84 589.88 174.72C587.56 173.52 585.68 171.88 584.24 169.8C582.8 167.64 582.08 164.84 582.08 161.4C582.08 157.56 583.12 154.28 585.2 151.56C587.28 148.76 590.2 146.6 593.96 145.08C597.8 143.56 602.16 142.8 607.04 142.8C611.68 142.8 616.16 143.44 620.48 144.72C624.88 145.92 629.08 147.88 633.08 150.6L626.48 159.48C623.28 157.24 620 155.68 616.64 154.8C613.36 153.84 610.04 153.36 606.68 153.36C602.84 153.36 599.8 154 597.56 155.28C595.32 156.48 594.2 158.16 594.2 160.32C594.2 162.16 594.92 163.56 596.36 164.52C597.8 165.48 599.72 166.2 602.12 166.68C604.52 167.16 607.16 167.6 610.04 168C612.92 168.4 615.76 168.92 618.56 169.56C621.44 170.2 624.08 171.12 626.48 172.32C628.88 173.52 630.8 175.2 632.24 177.36C633.68 179.52 634.4 182.36 634.4 185.88C634.4 189.64 633.2 193 630.8 195.96C628.48 198.84 625.28 201.12 621.2 202.8C617.12 204.4 612.56 205.2 607.52 205.2ZM653.673 204L653.673 117.96L667.233 115.56L667.233 152.88C671.873 146.24 678.033 142.92 685.713 142.92C689.873 142.92 693.513 143.84 696.633 145.68C699.753 147.44 702.193 149.96 703.953 153.24C705.793 156.44 706.713 160.16 706.713 164.4L706.713 204L693.033 204L693.033 168.24C693.033 163.84 691.833 160.36 689.433 157.8C687.033 155.16 683.833 153.84 679.833 153.84C677.273 153.84 674.913 154.4 672.753 155.52C670.593 156.64 668.753 158.28 667.233 160.44L667.233 204L653.673 204ZM751.906 205.2C746.226 205.2 741.106 203.84 736.546 201.12C731.986 198.32 728.386 194.6 725.746 189.96C723.106 185.24 721.786 179.92 721.786 174C721.786 168.16 723.106 162.92 725.746 158.28C728.386 153.56 731.986 149.84 736.546 147.12C741.106 144.32 746.226 142.92 751.906 142.92C757.586 142.92 762.706 144.32 767.266 147.12C771.826 149.84 775.426 153.56 778.066 158.28C780.706 162.92 782.026 168.16 782.026 174C782.026 179.92 780.706 185.24 778.066 189.96C775.426 194.6 771.826 198.32 767.266 201.12C762.786 203.84 757.666 205.2 751.906 205.2ZM751.906 193.56C755.186 193.56 758.066 192.72 760.546 191.04C763.106 189.36 765.106 187.04 766.546 184.08C768.066 181.12 768.826 177.76 768.826 174C768.826 170.24 768.066 166.92 766.546 164.04C765.106 161.08 763.106 158.76 760.546 157.08C758.066 155.4 755.186 154.56 751.906 154.56C748.626 154.56 745.706 155.44 743.146 157.2C740.666 158.88 738.666 161.2 737.146 164.16C735.706 167.04 734.986 170.32 734.986 174C734.986 177.76 735.706 181.12 737.146 184.08C738.666 187.04 740.666 189.36 743.146 191.04C745.706 192.72 748.626 193.56 751.906 193.56ZM834.419 205.2C826.899 205.2 821.179 203.56 817.259 200.28C813.419 196.92 811.499 192.04 811.499 185.64L811.499 154.68L792.299 154.68L792.299 143.88L811.499 143.88L811.499 127.32L825.059 124.44L825.059 143.88L850.499 143.88L850.499 154.68L825.059 154.68L825.059 183.12C825.059 186.88 825.939 189.56 827.699 191.16C829.539 192.76 832.379 193.56 836.219 193.56C838.299 193.56 840.459 193.4 842.699 193.08C845.019 192.68 847.659 191.96 850.619 190.92L850.619 202.44C848.059 203.24 845.379 203.88 842.579 204.36C839.779 204.92 837.059 205.2 834.419 205.2Z"
            fill="#3B4642"
          />
          <path
            d="M242.58 84.857L112.071 24L67.2738 120.069L165.155 165.711L147.405 203.776L82.1509 173.348L90.1806 156.128L57.5535 140.914L36 187.135L166.508 247.992L211.306 151.924L113.425 106.281L131.175 68.2161L196.429 98.6446L188.399 115.864L221.026 131.079L242.58 84.857Z"
            fill="#3B4642"
          />
        </svg>
      ) : (
        <svg
          width="901"
          height="285"
          viewBox="0 0 901 285"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M319.708 205.2C314.108 205.2 308.908 204.48 304.108 203.04C299.388 201.52 295.348 199.36 291.988 196.56L298.588 187.56C302.748 190.2 306.468 192.04 309.748 193.08C313.028 194.12 316.308 194.64 319.588 194.64C323.988 194.64 327.468 193.92 330.028 192.48C332.668 191.04 333.988 189.16 333.988 186.84C333.988 185 333.268 183.56 331.828 182.52C330.388 181.48 328.508 180.72 326.188 180.24C323.868 179.76 321.268 179.32 318.388 178.92C315.588 178.52 312.748 178 309.868 177.36C307.068 176.72 304.468 175.84 302.068 174.72C299.748 173.52 297.868 171.88 296.428 169.8C294.988 167.64 294.268 164.84 294.268 161.4C294.268 157.56 295.308 154.28 297.388 151.56C299.468 148.76 302.388 146.6 306.148 145.08C309.988 143.56 314.348 142.8 319.228 142.8C323.868 142.8 328.348 143.44 332.668 144.72C337.068 145.92 341.268 147.88 345.268 150.6L338.668 159.48C335.468 157.24 332.188 155.68 328.828 154.8C325.548 153.84 322.228 153.36 318.868 153.36C315.028 153.36 311.988 154 309.748 155.28C307.508 156.48 306.388 158.16 306.388 160.32C306.388 162.16 307.108 163.56 308.548 164.52C309.988 165.48 311.908 166.2 314.308 166.68C316.708 167.16 319.348 167.6 322.228 168C325.108 168.4 327.948 168.92 330.748 169.56C333.628 170.2 336.268 171.12 338.668 172.32C341.068 173.52 342.988 175.2 344.428 177.36C345.868 179.52 346.588 182.36 346.588 185.88C346.588 189.64 345.388 193 342.988 195.96C340.668 198.84 337.468 201.12 333.388 202.8C329.308 204.4 324.748 205.2 319.708 205.2ZM365.861 204L365.861 143.88L379.421 143.88L379.421 152.88C384.061 146.24 390.221 142.92 397.901 142.92C402.061 142.92 405.701 143.84 408.821 145.68C411.941 147.44 414.381 149.96 416.141 153.24C417.981 156.44 418.901 160.16 418.901 164.4L418.901 204L405.221 204L405.221 168.24C405.221 163.84 404.021 160.36 401.621 157.8C399.221 155.16 396.021 153.84 392.021 153.84C389.461 153.84 387.101 154.4 384.941 155.52C382.781 156.64 380.941 158.28 379.421 160.44L379.421 204L365.861 204ZM463.734 132.12C461.014 132.12 458.694 131.16 456.774 129.24C454.934 127.32 454.014 125.04 454.014 122.4C454.014 119.76 454.934 117.52 456.774 115.68C458.694 113.76 461.014 112.8 463.734 112.8C466.374 112.8 468.614 113.76 470.454 115.68C472.374 117.52 473.334 119.76 473.334 122.4C473.334 125.04 472.374 127.32 470.454 129.24C468.614 131.16 466.374 132.12 463.734 132.12ZM479.094 205.2C471.814 205.2 466.294 203.48 462.534 200.04C458.774 196.6 456.894 191.52 456.894 184.8L456.894 154.68L435.294 154.68L435.294 143.88L470.454 143.88L470.454 183.36C470.454 186.96 471.294 189.56 472.974 191.16C474.734 192.76 477.374 193.56 480.894 193.56C482.894 193.56 484.854 193.36 486.774 192.96C488.694 192.56 490.814 191.92 493.134 191.04L493.134 202.44C491.294 203.16 489.094 203.8 486.534 204.36C483.974 204.92 481.494 205.2 479.094 205.2ZM509.167 229.08L509.167 143.88L522.367 143.88L522.367 151.2C524.527 148.56 527.047 146.56 529.927 145.2C532.807 143.76 536.007 143.04 539.527 143.04C544.567 143.04 549.127 144.44 553.207 147.24C557.367 149.96 560.647 153.64 563.047 158.28C565.527 162.92 566.767 168.16 566.767 174C566.767 179.76 565.527 185 563.047 189.72C560.567 194.36 557.247 198.04 553.087 200.76C549.007 203.48 544.407 204.84 539.287 204.84C536.007 204.84 532.967 204.24 530.167 203.04C527.367 201.76 524.887 199.96 522.727 197.64L522.727 229.08L509.167 229.08ZM536.287 193.8C539.647 193.8 542.607 192.96 545.167 191.28C547.727 189.6 549.727 187.28 551.167 184.32C552.607 181.28 553.327 177.84 553.327 174C553.327 170.16 552.607 166.76 551.167 163.8C549.727 160.84 547.727 158.52 545.167 156.84C542.607 155.08 539.647 154.2 536.287 154.2C533.567 154.2 531.047 154.76 528.727 155.88C526.407 156.92 524.407 158.44 522.727 160.44L522.727 187.56C524.407 189.56 526.407 191.12 528.727 192.24C531.127 193.28 533.647 193.8 536.287 193.8ZM607.52 205.2C601.92 205.2 596.72 204.48 591.92 203.04C587.2 201.52 583.16 199.36 579.8 196.56L586.4 187.56C590.56 190.2 594.28 192.04 597.56 193.08C600.84 194.12 604.12 194.64 607.4 194.64C611.8 194.64 615.28 193.92 617.84 192.48C620.48 191.04 621.8 189.16 621.8 186.84C621.8 185 621.08 183.56 619.64 182.52C618.2 181.48 616.32 180.72 614 180.24C611.68 179.76 609.08 179.32 606.2 178.92C603.4 178.52 600.56 178 597.68 177.36C594.88 176.72 592.28 175.84 589.88 174.72C587.56 173.52 585.68 171.88 584.24 169.8C582.8 167.64 582.08 164.84 582.08 161.4C582.08 157.56 583.12 154.28 585.2 151.56C587.28 148.76 590.2 146.6 593.96 145.08C597.8 143.56 602.16 142.8 607.04 142.8C611.68 142.8 616.16 143.44 620.48 144.72C624.88 145.92 629.08 147.88 633.08 150.6L626.48 159.48C623.28 157.24 620 155.68 616.64 154.8C613.36 153.84 610.04 153.36 606.68 153.36C602.84 153.36 599.8 154 597.56 155.28C595.32 156.48 594.2 158.16 594.2 160.32C594.2 162.16 594.92 163.56 596.36 164.52C597.8 165.48 599.72 166.2 602.12 166.68C604.52 167.16 607.16 167.6 610.04 168C612.92 168.4 615.76 168.92 618.56 169.56C621.44 170.2 624.08 171.12 626.48 172.32C628.88 173.52 630.8 175.2 632.24 177.36C633.68 179.52 634.4 182.36 634.4 185.88C634.4 189.64 633.2 193 630.8 195.96C628.48 198.84 625.28 201.12 621.2 202.8C617.12 204.4 612.56 205.2 607.52 205.2ZM653.673 204L653.673 117.96L667.233 115.56L667.233 152.88C671.873 146.24 678.033 142.92 685.713 142.92C689.873 142.92 693.513 143.84 696.633 145.68C699.753 147.44 702.193 149.96 703.953 153.24C705.793 156.44 706.713 160.16 706.713 164.4L706.713 204L693.033 204L693.033 168.24C693.033 163.84 691.833 160.36 689.433 157.8C687.033 155.16 683.833 153.84 679.833 153.84C677.273 153.84 674.913 154.4 672.753 155.52C670.593 156.64 668.753 158.28 667.233 160.44L667.233 204L653.673 204ZM751.906 205.2C746.226 205.2 741.106 203.84 736.546 201.12C731.986 198.32 728.386 194.6 725.746 189.96C723.106 185.24 721.786 179.92 721.786 174C721.786 168.16 723.106 162.92 725.746 158.28C728.386 153.56 731.986 149.84 736.546 147.12C741.106 144.32 746.226 142.92 751.906 142.92C757.586 142.92 762.706 144.32 767.266 147.12C771.826 149.84 775.426 153.56 778.066 158.28C780.706 162.92 782.026 168.16 782.026 174C782.026 179.92 780.706 185.24 778.066 189.96C775.426 194.6 771.826 198.32 767.266 201.12C762.786 203.84 757.666 205.2 751.906 205.2ZM751.906 193.56C755.186 193.56 758.066 192.72 760.546 191.04C763.106 189.36 765.106 187.04 766.546 184.08C768.066 181.12 768.826 177.76 768.826 174C768.826 170.24 768.066 166.92 766.546 164.04C765.106 161.08 763.106 158.76 760.546 157.08C758.066 155.4 755.186 154.56 751.906 154.56C748.626 154.56 745.706 155.44 743.146 157.2C740.666 158.88 738.666 161.2 737.146 164.16C735.706 167.04 734.986 170.32 734.986 174C734.986 177.76 735.706 181.12 737.146 184.08C738.666 187.04 740.666 189.36 743.146 191.04C745.706 192.72 748.626 193.56 751.906 193.56ZM834.419 205.2C826.899 205.2 821.179 203.56 817.259 200.28C813.419 196.92 811.499 192.04 811.499 185.64L811.499 154.68L792.299 154.68L792.299 143.88L811.499 143.88L811.499 127.32L825.059 124.44L825.059 143.88L850.499 143.88L850.499 154.68L825.059 154.68L825.059 183.12C825.059 186.88 825.939 189.56 827.699 191.16C829.539 192.76 832.379 193.56 836.219 193.56C838.299 193.56 840.459 193.4 842.699 193.08C845.019 192.68 847.659 191.96 850.619 190.92L850.619 202.44C848.059 203.24 845.379 203.88 842.579 204.36C839.779 204.92 837.059 205.2 834.419 205.2Z"
            fill="#FAFDFA"
          />
          <path
            d="M242.58 84.857L112.071 24L67.2738 120.069L165.155 165.711L147.405 203.776L82.1509 173.348L90.1806 156.128L57.5535 140.914L36 187.135L166.508 247.992L211.306 151.924L113.425 106.281L131.175 68.2161L196.429 98.6446L188.399 115.864L221.026 131.079L242.58 84.857Z"
            fill="#FAFDFA"
          />
        </svg>
      )}
    </LogoContainer>
    // <Box
    //   as={isLink ? NextLink : undefined}
    //   href="/"
    //   pt={1}
    //   css={{ svg: { height: 50, width: 'auto' } }}
    // >
    //   {colorMode === 'light' ? (
    //     <svg
    //       width="901"
    //       height="285"
    //       viewBox="0 0 901 285"
    //       fill="none"
    //       xmlns="http://www.w3.org/2000/svg"
    //     >
    //       <title>Snipshot Logo</title>
    //       <path
    //         d="M319.708 205.2C314.108 205.2 308.908 204.48 304.108 203.04C299.388 201.52 295.348 199.36 291.988 196.56L298.588 187.56C302.748 190.2 306.468 192.04 309.748 193.08C313.028 194.12 316.308 194.64 319.588 194.64C323.988 194.64 327.468 193.92 330.028 192.48C332.668 191.04 333.988 189.16 333.988 186.84C333.988 185 333.268 183.56 331.828 182.52C330.388 181.48 328.508 180.72 326.188 180.24C323.868 179.76 321.268 179.32 318.388 178.92C315.588 178.52 312.748 178 309.868 177.36C307.068 176.72 304.468 175.84 302.068 174.72C299.748 173.52 297.868 171.88 296.428 169.8C294.988 167.64 294.268 164.84 294.268 161.4C294.268 157.56 295.308 154.28 297.388 151.56C299.468 148.76 302.388 146.6 306.148 145.08C309.988 143.56 314.348 142.8 319.228 142.8C323.868 142.8 328.348 143.44 332.668 144.72C337.068 145.92 341.268 147.88 345.268 150.6L338.668 159.48C335.468 157.24 332.188 155.68 328.828 154.8C325.548 153.84 322.228 153.36 318.868 153.36C315.028 153.36 311.988 154 309.748 155.28C307.508 156.48 306.388 158.16 306.388 160.32C306.388 162.16 307.108 163.56 308.548 164.52C309.988 165.48 311.908 166.2 314.308 166.68C316.708 167.16 319.348 167.6 322.228 168C325.108 168.4 327.948 168.92 330.748 169.56C333.628 170.2 336.268 171.12 338.668 172.32C341.068 173.52 342.988 175.2 344.428 177.36C345.868 179.52 346.588 182.36 346.588 185.88C346.588 189.64 345.388 193 342.988 195.96C340.668 198.84 337.468 201.12 333.388 202.8C329.308 204.4 324.748 205.2 319.708 205.2ZM365.861 204L365.861 143.88L379.421 143.88L379.421 152.88C384.061 146.24 390.221 142.92 397.901 142.92C402.061 142.92 405.701 143.84 408.821 145.68C411.941 147.44 414.381 149.96 416.141 153.24C417.981 156.44 418.901 160.16 418.901 164.4L418.901 204L405.221 204L405.221 168.24C405.221 163.84 404.021 160.36 401.621 157.8C399.221 155.16 396.021 153.84 392.021 153.84C389.461 153.84 387.101 154.4 384.941 155.52C382.781 156.64 380.941 158.28 379.421 160.44L379.421 204L365.861 204ZM463.734 132.12C461.014 132.12 458.694 131.16 456.774 129.24C454.934 127.32 454.014 125.04 454.014 122.4C454.014 119.76 454.934 117.52 456.774 115.68C458.694 113.76 461.014 112.8 463.734 112.8C466.374 112.8 468.614 113.76 470.454 115.68C472.374 117.52 473.334 119.76 473.334 122.4C473.334 125.04 472.374 127.32 470.454 129.24C468.614 131.16 466.374 132.12 463.734 132.12ZM479.094 205.2C471.814 205.2 466.294 203.48 462.534 200.04C458.774 196.6 456.894 191.52 456.894 184.8L456.894 154.68L435.294 154.68L435.294 143.88L470.454 143.88L470.454 183.36C470.454 186.96 471.294 189.56 472.974 191.16C474.734 192.76 477.374 193.56 480.894 193.56C482.894 193.56 484.854 193.36 486.774 192.96C488.694 192.56 490.814 191.92 493.134 191.04L493.134 202.44C491.294 203.16 489.094 203.8 486.534 204.36C483.974 204.92 481.494 205.2 479.094 205.2ZM509.167 229.08L509.167 143.88L522.367 143.88L522.367 151.2C524.527 148.56 527.047 146.56 529.927 145.2C532.807 143.76 536.007 143.04 539.527 143.04C544.567 143.04 549.127 144.44 553.207 147.24C557.367 149.96 560.647 153.64 563.047 158.28C565.527 162.92 566.767 168.16 566.767 174C566.767 179.76 565.527 185 563.047 189.72C560.567 194.36 557.247 198.04 553.087 200.76C549.007 203.48 544.407 204.84 539.287 204.84C536.007 204.84 532.967 204.24 530.167 203.04C527.367 201.76 524.887 199.96 522.727 197.64L522.727 229.08L509.167 229.08ZM536.287 193.8C539.647 193.8 542.607 192.96 545.167 191.28C547.727 189.6 549.727 187.28 551.167 184.32C552.607 181.28 553.327 177.84 553.327 174C553.327 170.16 552.607 166.76 551.167 163.8C549.727 160.84 547.727 158.52 545.167 156.84C542.607 155.08 539.647 154.2 536.287 154.2C533.567 154.2 531.047 154.76 528.727 155.88C526.407 156.92 524.407 158.44 522.727 160.44L522.727 187.56C524.407 189.56 526.407 191.12 528.727 192.24C531.127 193.28 533.647 193.8 536.287 193.8ZM607.52 205.2C601.92 205.2 596.72 204.48 591.92 203.04C587.2 201.52 583.16 199.36 579.8 196.56L586.4 187.56C590.56 190.2 594.28 192.04 597.56 193.08C600.84 194.12 604.12 194.64 607.4 194.64C611.8 194.64 615.28 193.92 617.84 192.48C620.48 191.04 621.8 189.16 621.8 186.84C621.8 185 621.08 183.56 619.64 182.52C618.2 181.48 616.32 180.72 614 180.24C611.68 179.76 609.08 179.32 606.2 178.92C603.4 178.52 600.56 178 597.68 177.36C594.88 176.72 592.28 175.84 589.88 174.72C587.56 173.52 585.68 171.88 584.24 169.8C582.8 167.64 582.08 164.84 582.08 161.4C582.08 157.56 583.12 154.28 585.2 151.56C587.28 148.76 590.2 146.6 593.96 145.08C597.8 143.56 602.16 142.8 607.04 142.8C611.68 142.8 616.16 143.44 620.48 144.72C624.88 145.92 629.08 147.88 633.08 150.6L626.48 159.48C623.28 157.24 620 155.68 616.64 154.8C613.36 153.84 610.04 153.36 606.68 153.36C602.84 153.36 599.8 154 597.56 155.28C595.32 156.48 594.2 158.16 594.2 160.32C594.2 162.16 594.92 163.56 596.36 164.52C597.8 165.48 599.72 166.2 602.12 166.68C604.52 167.16 607.16 167.6 610.04 168C612.92 168.4 615.76 168.92 618.56 169.56C621.44 170.2 624.08 171.12 626.48 172.32C628.88 173.52 630.8 175.2 632.24 177.36C633.68 179.52 634.4 182.36 634.4 185.88C634.4 189.64 633.2 193 630.8 195.96C628.48 198.84 625.28 201.12 621.2 202.8C617.12 204.4 612.56 205.2 607.52 205.2ZM653.673 204L653.673 117.96L667.233 115.56L667.233 152.88C671.873 146.24 678.033 142.92 685.713 142.92C689.873 142.92 693.513 143.84 696.633 145.68C699.753 147.44 702.193 149.96 703.953 153.24C705.793 156.44 706.713 160.16 706.713 164.4L706.713 204L693.033 204L693.033 168.24C693.033 163.84 691.833 160.36 689.433 157.8C687.033 155.16 683.833 153.84 679.833 153.84C677.273 153.84 674.913 154.4 672.753 155.52C670.593 156.64 668.753 158.28 667.233 160.44L667.233 204L653.673 204ZM751.906 205.2C746.226 205.2 741.106 203.84 736.546 201.12C731.986 198.32 728.386 194.6 725.746 189.96C723.106 185.24 721.786 179.92 721.786 174C721.786 168.16 723.106 162.92 725.746 158.28C728.386 153.56 731.986 149.84 736.546 147.12C741.106 144.32 746.226 142.92 751.906 142.92C757.586 142.92 762.706 144.32 767.266 147.12C771.826 149.84 775.426 153.56 778.066 158.28C780.706 162.92 782.026 168.16 782.026 174C782.026 179.92 780.706 185.24 778.066 189.96C775.426 194.6 771.826 198.32 767.266 201.12C762.786 203.84 757.666 205.2 751.906 205.2ZM751.906 193.56C755.186 193.56 758.066 192.72 760.546 191.04C763.106 189.36 765.106 187.04 766.546 184.08C768.066 181.12 768.826 177.76 768.826 174C768.826 170.24 768.066 166.92 766.546 164.04C765.106 161.08 763.106 158.76 760.546 157.08C758.066 155.4 755.186 154.56 751.906 154.56C748.626 154.56 745.706 155.44 743.146 157.2C740.666 158.88 738.666 161.2 737.146 164.16C735.706 167.04 734.986 170.32 734.986 174C734.986 177.76 735.706 181.12 737.146 184.08C738.666 187.04 740.666 189.36 743.146 191.04C745.706 192.72 748.626 193.56 751.906 193.56ZM834.419 205.2C826.899 205.2 821.179 203.56 817.259 200.28C813.419 196.92 811.499 192.04 811.499 185.64L811.499 154.68L792.299 154.68L792.299 143.88L811.499 143.88L811.499 127.32L825.059 124.44L825.059 143.88L850.499 143.88L850.499 154.68L825.059 154.68L825.059 183.12C825.059 186.88 825.939 189.56 827.699 191.16C829.539 192.76 832.379 193.56 836.219 193.56C838.299 193.56 840.459 193.4 842.699 193.08C845.019 192.68 847.659 191.96 850.619 190.92L850.619 202.44C848.059 203.24 845.379 203.88 842.579 204.36C839.779 204.92 837.059 205.2 834.419 205.2Z"
    //         fill="#3B4642"
    //       />
    //       <path
    //         d="M242.58 84.857L112.071 24L67.2738 120.069L165.155 165.711L147.405 203.776L82.1509 173.348L90.1806 156.128L57.5535 140.914L36 187.135L166.508 247.992L211.306 151.924L113.425 106.281L131.175 68.2161L196.429 98.6446L188.399 115.864L221.026 131.079L242.58 84.857Z"
    //         fill="#3B4642"
    //       />
    //     </svg>
    //   ) : (
    //     <svg
    //       width="901"
    //       height="285"
    //       viewBox="0 0 901 285"
    //       fill="none"
    //       xmlns="http://www.w3.org/2000/svg"
    //     >
    //       <path
    //         d="M319.708 205.2C314.108 205.2 308.908 204.48 304.108 203.04C299.388 201.52 295.348 199.36 291.988 196.56L298.588 187.56C302.748 190.2 306.468 192.04 309.748 193.08C313.028 194.12 316.308 194.64 319.588 194.64C323.988 194.64 327.468 193.92 330.028 192.48C332.668 191.04 333.988 189.16 333.988 186.84C333.988 185 333.268 183.56 331.828 182.52C330.388 181.48 328.508 180.72 326.188 180.24C323.868 179.76 321.268 179.32 318.388 178.92C315.588 178.52 312.748 178 309.868 177.36C307.068 176.72 304.468 175.84 302.068 174.72C299.748 173.52 297.868 171.88 296.428 169.8C294.988 167.64 294.268 164.84 294.268 161.4C294.268 157.56 295.308 154.28 297.388 151.56C299.468 148.76 302.388 146.6 306.148 145.08C309.988 143.56 314.348 142.8 319.228 142.8C323.868 142.8 328.348 143.44 332.668 144.72C337.068 145.92 341.268 147.88 345.268 150.6L338.668 159.48C335.468 157.24 332.188 155.68 328.828 154.8C325.548 153.84 322.228 153.36 318.868 153.36C315.028 153.36 311.988 154 309.748 155.28C307.508 156.48 306.388 158.16 306.388 160.32C306.388 162.16 307.108 163.56 308.548 164.52C309.988 165.48 311.908 166.2 314.308 166.68C316.708 167.16 319.348 167.6 322.228 168C325.108 168.4 327.948 168.92 330.748 169.56C333.628 170.2 336.268 171.12 338.668 172.32C341.068 173.52 342.988 175.2 344.428 177.36C345.868 179.52 346.588 182.36 346.588 185.88C346.588 189.64 345.388 193 342.988 195.96C340.668 198.84 337.468 201.12 333.388 202.8C329.308 204.4 324.748 205.2 319.708 205.2ZM365.861 204L365.861 143.88L379.421 143.88L379.421 152.88C384.061 146.24 390.221 142.92 397.901 142.92C402.061 142.92 405.701 143.84 408.821 145.68C411.941 147.44 414.381 149.96 416.141 153.24C417.981 156.44 418.901 160.16 418.901 164.4L418.901 204L405.221 204L405.221 168.24C405.221 163.84 404.021 160.36 401.621 157.8C399.221 155.16 396.021 153.84 392.021 153.84C389.461 153.84 387.101 154.4 384.941 155.52C382.781 156.64 380.941 158.28 379.421 160.44L379.421 204L365.861 204ZM463.734 132.12C461.014 132.12 458.694 131.16 456.774 129.24C454.934 127.32 454.014 125.04 454.014 122.4C454.014 119.76 454.934 117.52 456.774 115.68C458.694 113.76 461.014 112.8 463.734 112.8C466.374 112.8 468.614 113.76 470.454 115.68C472.374 117.52 473.334 119.76 473.334 122.4C473.334 125.04 472.374 127.32 470.454 129.24C468.614 131.16 466.374 132.12 463.734 132.12ZM479.094 205.2C471.814 205.2 466.294 203.48 462.534 200.04C458.774 196.6 456.894 191.52 456.894 184.8L456.894 154.68L435.294 154.68L435.294 143.88L470.454 143.88L470.454 183.36C470.454 186.96 471.294 189.56 472.974 191.16C474.734 192.76 477.374 193.56 480.894 193.56C482.894 193.56 484.854 193.36 486.774 192.96C488.694 192.56 490.814 191.92 493.134 191.04L493.134 202.44C491.294 203.16 489.094 203.8 486.534 204.36C483.974 204.92 481.494 205.2 479.094 205.2ZM509.167 229.08L509.167 143.88L522.367 143.88L522.367 151.2C524.527 148.56 527.047 146.56 529.927 145.2C532.807 143.76 536.007 143.04 539.527 143.04C544.567 143.04 549.127 144.44 553.207 147.24C557.367 149.96 560.647 153.64 563.047 158.28C565.527 162.92 566.767 168.16 566.767 174C566.767 179.76 565.527 185 563.047 189.72C560.567 194.36 557.247 198.04 553.087 200.76C549.007 203.48 544.407 204.84 539.287 204.84C536.007 204.84 532.967 204.24 530.167 203.04C527.367 201.76 524.887 199.96 522.727 197.64L522.727 229.08L509.167 229.08ZM536.287 193.8C539.647 193.8 542.607 192.96 545.167 191.28C547.727 189.6 549.727 187.28 551.167 184.32C552.607 181.28 553.327 177.84 553.327 174C553.327 170.16 552.607 166.76 551.167 163.8C549.727 160.84 547.727 158.52 545.167 156.84C542.607 155.08 539.647 154.2 536.287 154.2C533.567 154.2 531.047 154.76 528.727 155.88C526.407 156.92 524.407 158.44 522.727 160.44L522.727 187.56C524.407 189.56 526.407 191.12 528.727 192.24C531.127 193.28 533.647 193.8 536.287 193.8ZM607.52 205.2C601.92 205.2 596.72 204.48 591.92 203.04C587.2 201.52 583.16 199.36 579.8 196.56L586.4 187.56C590.56 190.2 594.28 192.04 597.56 193.08C600.84 194.12 604.12 194.64 607.4 194.64C611.8 194.64 615.28 193.92 617.84 192.48C620.48 191.04 621.8 189.16 621.8 186.84C621.8 185 621.08 183.56 619.64 182.52C618.2 181.48 616.32 180.72 614 180.24C611.68 179.76 609.08 179.32 606.2 178.92C603.4 178.52 600.56 178 597.68 177.36C594.88 176.72 592.28 175.84 589.88 174.72C587.56 173.52 585.68 171.88 584.24 169.8C582.8 167.64 582.08 164.84 582.08 161.4C582.08 157.56 583.12 154.28 585.2 151.56C587.28 148.76 590.2 146.6 593.96 145.08C597.8 143.56 602.16 142.8 607.04 142.8C611.68 142.8 616.16 143.44 620.48 144.72C624.88 145.92 629.08 147.88 633.08 150.6L626.48 159.48C623.28 157.24 620 155.68 616.64 154.8C613.36 153.84 610.04 153.36 606.68 153.36C602.84 153.36 599.8 154 597.56 155.28C595.32 156.48 594.2 158.16 594.2 160.32C594.2 162.16 594.92 163.56 596.36 164.52C597.8 165.48 599.72 166.2 602.12 166.68C604.52 167.16 607.16 167.6 610.04 168C612.92 168.4 615.76 168.92 618.56 169.56C621.44 170.2 624.08 171.12 626.48 172.32C628.88 173.52 630.8 175.2 632.24 177.36C633.68 179.52 634.4 182.36 634.4 185.88C634.4 189.64 633.2 193 630.8 195.96C628.48 198.84 625.28 201.12 621.2 202.8C617.12 204.4 612.56 205.2 607.52 205.2ZM653.673 204L653.673 117.96L667.233 115.56L667.233 152.88C671.873 146.24 678.033 142.92 685.713 142.92C689.873 142.92 693.513 143.84 696.633 145.68C699.753 147.44 702.193 149.96 703.953 153.24C705.793 156.44 706.713 160.16 706.713 164.4L706.713 204L693.033 204L693.033 168.24C693.033 163.84 691.833 160.36 689.433 157.8C687.033 155.16 683.833 153.84 679.833 153.84C677.273 153.84 674.913 154.4 672.753 155.52C670.593 156.64 668.753 158.28 667.233 160.44L667.233 204L653.673 204ZM751.906 205.2C746.226 205.2 741.106 203.84 736.546 201.12C731.986 198.32 728.386 194.6 725.746 189.96C723.106 185.24 721.786 179.92 721.786 174C721.786 168.16 723.106 162.92 725.746 158.28C728.386 153.56 731.986 149.84 736.546 147.12C741.106 144.32 746.226 142.92 751.906 142.92C757.586 142.92 762.706 144.32 767.266 147.12C771.826 149.84 775.426 153.56 778.066 158.28C780.706 162.92 782.026 168.16 782.026 174C782.026 179.92 780.706 185.24 778.066 189.96C775.426 194.6 771.826 198.32 767.266 201.12C762.786 203.84 757.666 205.2 751.906 205.2ZM751.906 193.56C755.186 193.56 758.066 192.72 760.546 191.04C763.106 189.36 765.106 187.04 766.546 184.08C768.066 181.12 768.826 177.76 768.826 174C768.826 170.24 768.066 166.92 766.546 164.04C765.106 161.08 763.106 158.76 760.546 157.08C758.066 155.4 755.186 154.56 751.906 154.56C748.626 154.56 745.706 155.44 743.146 157.2C740.666 158.88 738.666 161.2 737.146 164.16C735.706 167.04 734.986 170.32 734.986 174C734.986 177.76 735.706 181.12 737.146 184.08C738.666 187.04 740.666 189.36 743.146 191.04C745.706 192.72 748.626 193.56 751.906 193.56ZM834.419 205.2C826.899 205.2 821.179 203.56 817.259 200.28C813.419 196.92 811.499 192.04 811.499 185.64L811.499 154.68L792.299 154.68L792.299 143.88L811.499 143.88L811.499 127.32L825.059 124.44L825.059 143.88L850.499 143.88L850.499 154.68L825.059 154.68L825.059 183.12C825.059 186.88 825.939 189.56 827.699 191.16C829.539 192.76 832.379 193.56 836.219 193.56C838.299 193.56 840.459 193.4 842.699 193.08C845.019 192.68 847.659 191.96 850.619 190.92L850.619 202.44C848.059 203.24 845.379 203.88 842.579 204.36C839.779 204.92 837.059 205.2 834.419 205.2Z"
    //         fill="#FAFDFA"
    //       />
    //       <path
    //         d="M242.58 84.857L112.071 24L67.2738 120.069L165.155 165.711L147.405 203.776L82.1509 173.348L90.1806 156.128L57.5535 140.914L36 187.135L166.508 247.992L211.306 151.924L113.425 106.281L131.175 68.2161L196.429 98.6446L188.399 115.864L221.026 131.079L242.58 84.857Z"
    //         fill="#FAFDFA"
    //       />
    //     </svg>
    //   )}
    // </Box>
  );
}

export default Logo;
