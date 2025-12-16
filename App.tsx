import React, { useState } from 'react';
import BookFrame from './components/BookFrame';
import { fetchOracleAdvice } from './services/oracleService';
import { AppState } from './types';

const App: React.FC = () => {
  const [query, setQuery] = useState('');
  const [state, setState] = useState<AppState>(AppState.IDLE);
  const [answer, setAnswer] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleStart = async () => {
    setState(AppState.LOADING);
    setAnswer('');
    setErrorMsg('');

    try {
      // Simulate "Ritual" delay (Waiting for mystery) - min 2 seconds
      const startTime = Date.now();
      const advice = await fetchOracleAdvice(query);
      const elapsedTime = Date.now() - startTime;
      const minDelay = 2000;
      
      if (elapsedTime < minDelay) {
        await new Promise(resolve => setTimeout(resolve, minDelay - elapsedTime));
      }

      setAnswer(advice);
      setState(AppState.RESULT);
    } catch (err) {
      setErrorMsg("天機晦暗，暫無回應。請稍後再試。");
      setState(AppState.ERROR);
    }
  };

  const handleReset = () => {
    setQuery('');
    setAnswer('');
    setState(AppState.IDLE);
    setErrorMsg('');
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-[#e8e4dc] font-serif text-ink-blue">
      <BookFrame>
        
        {/* Header / Title */}
        <header className="mb-8 text-center">
          <h1 className="text-3xl md:text-4xl font-bold tracking-[0.2em] mb-2 border-b-2 border-ink-blue inline-block pb-2">
            玄機錄
          </h1>
          <p className="text-sm md:text-base opacity-75 tracking-widest mt-2 uppercase">
            The Book of Answers
          </p>
        </header>

        {/* Content Area based on State */}
        <main className="flex-grow flex flex-col items-center justify-center w-full">
          
          {state === AppState.IDLE && (
            <div className="w-full flex flex-col items-center animate-fade-in">
              <p className="text-center mb-8 leading-loose tracking-wide opacity-90">
                心有迷惘，或有抉擇？<br />
                於此寫下，或心中默唸。<br />
                待心誠，則靈現。
              </p>
              
              <div className="w-full relative group mb-10">
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="（在此輸入，亦可留白）"
                  className="w-full bg-transparent border-b border-ink-blue/30 py-3 text-center text-lg focus:outline-none focus:border-ink-blue transition-colors placeholder:text-ink-blue/30"
                />
              </div>

              <button
                onClick={handleStart}
                className="group relative px-8 py-3 overflow-hidden rounded-sm bg-ink-blue text-paper-bg transition-all hover:shadow-lg hover:scale-105 active:scale-95 duration-500"
              >
                <div className="absolute inset-0 w-0 bg-ink-light transition-all duration-[250ms] ease-out group-hover:w-full opacity-20"></div>
                <span className="relative tracking-[0.3em] font-bold text-lg">得到解答</span>
              </button>
            </div>
          )}

          {state === AppState.LOADING && (
            <div className="flex flex-col items-center justify-center animate-pulse">
              <div className="w-16 h-16 border-4 border-ink-blue border-t-transparent rounded-full animate-spin mb-6"></div>
              <p className="text-lg tracking-widest opacity-80">
                凝神・聽風・問天
              </p>
            </div>
          )}

          {state === AppState.RESULT && (
            <div className="w-full flex flex-col items-center animate-[fadeIn_1s_ease-in-out]">
              <div className="mb-12 w-full text-center px-4">
                 <div className="text-2xl md:text-3xl leading-relaxed font-bold text-ink-blue whitespace-pre-line tracking-wide drop-shadow-sm">
                   {answer}
                 </div>
              </div>

              <div className="mt-8 border-t border-ink-blue/20 pt-6 w-3/4 flex justify-center">
                <button
                  onClick={handleReset}
                  className="text-sm tracking-widest opacity-60 hover:opacity-100 transition-opacity border-b border-transparent hover:border-ink-blue pb-1"
                >
                  再問一事
                </button>
              </div>
            </div>
          )}

          {state === AppState.ERROR && (
            <div className="text-center">
              <p className="mb-6 text-red-800 tracking-wide">{errorMsg}</p>
              <button
                onClick={handleReset}
                className="text-sm underline underline-offset-4"
              >
                返回
              </button>
            </div>
          )}

        </main>
        
        {/* Footer */}
        <footer className="mt-auto text-center opacity-40 text-xs tracking-widest pt-4">
          玄機導引者・非知識之庫・乃心靈之鏡
        </footer>

      </BookFrame>
    </div>
  );
};

export default App;
