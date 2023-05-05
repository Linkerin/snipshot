import { CSSProperties } from 'react';
import { NextRequest } from 'next/server';
import { ImageResponse } from '@vercel/og';
import { log } from 'next-axiom';

export const config = {
  runtime: 'edge'
};

export default async function handler(request: NextRequest) {
  const primaryColor = '#00e0bc';
  const statsBlockDisplayStyles: CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start'
  };
  const statsNumStyles: CSSProperties = {
    display: 'flex',
    fontSize: '42px',
    lineHeight: '26px'
  };
  const statsLabelStyles: CSSProperties = {
    display: 'flex',
    color: '#a0b4ae',
    fontSize: '36px',
    lineHeight: '22px'
  };

  try {
    const { searchParams } = new URL(request.url);

    const name = searchParams.get('name');
    if (!name) throw new Error('Name parameter is required');

    const avatarUrl = searchParams.get('avatar');
    const avatar =
      avatarUrl ?? `${process.env.NEXT_PUBLIC_BASE_URL}/images/GuestAvatar.svg`;

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API}/og/users-stats?name=${name}`
    );
    if (!res.ok) {
      const error = await res.json();
      throw new Error(error);
    }
    const stats = await res.json();

    return new ImageResponse(
      (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            justifyContent: 'flex-start',
            backgroundColor: '#282a36',
            color: '#fafdfa',
            height: '100%',
            width: '100%',
            padding: '2rem'
          }}
        >
          <img
            src="https://snipshot.dev/images/LogoDark.svg"
            alt="snipshot logo"
            height="95"
            width="300"
          />
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'flex-start',
              justifyContent: 'flex-start',
              marginTop: '5rem'
            }}
          >
            <div
              style={{
                display: 'flex',
                border: `4px solid ${primaryColor}`,
                borderRadius: '50%',
                padding: '14px',
                marginLeft: '2rem',
                marginRight: '4rem',
                height: '336px',
                width: '336px'
              }}
            >
              <img
                src={avatar}
                alt={`${name ?? 'guest'} avatar`}
                width="300px"
                height="300px"
                style={{ borderRadius: '50%' }}
              />
            </div>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                justifyContent: 'flex-start'
              }}
            >
              <h1
                style={{
                  fontSize: '88px',
                  lineHeight: '92px',
                  marginBottom: '1.6rem'
                }}
              >
                {name}
              </h1>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'flex-start',
                  marginTop: '2rem'
                }}
              >
                <div
                  style={{
                    paddingRight: '4rem',
                    borderRight: `2px solid ${primaryColor}`,
                    ...statsBlockDisplayStyles
                  }}
                >
                  <p style={statsNumStyles}>{stats.numOfSnippets}</p>
                  <p style={statsLabelStyles}>snips</p>
                </div>
                <div
                  style={{
                    padding: '0 4rem',
                    ...statsBlockDisplayStyles
                  }}
                >
                  <p style={statsNumStyles}>{stats.numOfFavorites}</p>
                  <p style={statsLabelStyles}>favorites</p>
                </div>
                <div
                  style={{
                    paddingLeft: '4rem',
                    borderLeft: `2px solid ${primaryColor}`,
                    ...statsBlockDisplayStyles
                  }}
                >
                  <p style={statsNumStyles}>{stats.rating}</p>
                  <p style={statsLabelStyles}>rating</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
        headers: {
          'cache-control': 'public, immutable, no-transform, max-age=86400'
        }
      }
    );
  } catch (err) {
    log.error('Failed to generate the OG user image', { err });
    return new Response('Failed to generate the OG user image', {
      status: 500
    });
  }
}
