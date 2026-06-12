# Branch Strategy（ブランチ戦略）
AIエージェントは **mainブランチへ直接コミットしてはいけない。**
## ブランチ作成手順

1. main ブランチを最新化する
git checkout main
git pull
2. publish ブランチにて作業を行う
3. 実装を行う
4. Conventional Commit 形式でコミット(コミットメッセージは日本語)
5. main ブランチへ Pull Request を作成する
6. ユーザがマージをお願いしたらマージする

---

## ブランチ命名規則
ブランチ名は以下の形式にする。
type/short-description
例:
feat/user-login  
fix/login-error  
docs/readme-update  
refactor/auth-controller  
test/login-spec  

---
## ブランチ作成例
新機能追加の場合
git checkout main
git pull
git checkout -b feat/add-user-profile

バグ修正の場合
git checkout main
git pull
git checkout -b fix/login-validation-error
---

## Pull Request フロー

AIエージェントは以下のフローで作業する。

task  
↓  
publish ブランチへ移動
↓  
実装  
↓  
commit  
↓  
Pull Request 作成  
↓  
review  
↓  
merge

---
# 共通ルール
- 日本語でやり取りしてください
- 最初にタスクを実行する計画を作成し、ユーザーの許可を得てから進行してください
- タスクを完遂するために追加で必要な情報がある場合、ユーザーに質問をしてください
- 重要な技術的決定をする場合、簡潔に提示し、ユーザーからのフィードバックを得てください
- コミットする際は 'Co-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>' をコミットメッセージに追加しないでください
